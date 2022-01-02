import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ProductsZonesService } from './products-zones.service';
import { CreateProductsZoneDto } from './dto/create-products-zone.dto';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { CreateReturnDto } from './dto/create-return.dto';
import { Sequelize } from 'sequelize-typescript';
import { ProductsService } from '../products/products.service';
import { EpcsService } from '../epcs/epcs.service';
import _ from 'underscore';
import { ProductsZonesExceptions } from './exceptions/products-zones.exceptions';
import { EpcStates } from '../epcs/entities/epc-state.entity';
import { ZonesService } from '../zones/zones.service';

@ApiTags('ProductsZones')
@Controller('products-zones')
export class ProductsZonesController {
  private readonly logger = new Logger(ProductsZonesController.name);

  constructor(
    private readonly sequelize: Sequelize,
    private readonly productsZonesService: ProductsZonesService,
    private readonly productsService: ProductsService,
    private readonly epcsService: EpcsService,
    private readonly zonesService: ZonesService,
    private readonly productsZoneExceptions: ProductsZonesExceptions,
  ) {}

  /**
   * This web service will link several epc with a product and a zone.
   * It is used in the mobile app
   */
  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @Post()
  async create(
    @UserAuth() token: TokenAuthEntity,
    @Body() body: CreateProductsZoneDto,
  ) {
    const companyId = token.employee.companyId;
    return await this.sequelize.transaction(async (transaction) => {
      /**
       * Find product to associate
       */
      const productToAssociate = await this.productsService.findOneById(
        body.productId,
        companyId,
        transaction,
      );
      if (productToAssociate) {
        /**
         * Find all the epcs of the products using the epcCode
         */
        let epcs = await this.epcsService.findNoAssignEpcByCode(
          _.map(body.products, 'code'),
          companyId,
          transaction,
        );
        for (const newProduct of body.products) {
          const epcFound = epcs.find((epc) => {
            return epc.code === newProduct.code;
          });
          if (epcFound) {
            newProduct.epcId = epcFound.id;
            newProduct.productId = productToAssociate.id;
            newProduct.devolutionId = 1;
            newProduct.sellId = 1;
          } else {
            this.logger.error('Epc no found ' + newProduct.code);
            this.productsZoneExceptions.epcNoFound(newProduct);
          }
        }

        /**
         * Create the new products zone
         */
        try {
          await this.productsZonesService.createBulk(
            body.products,
            transaction,
          );
        } catch (e) {
          this.productsZoneExceptions.productsZoneNoCreated(e);
        }

        /**
         * Update epc state to do not be able to use again
         */
        try {
          epcs = await this.epcsService.updateState(
            _.map(body.products, 'epcId'),
            EpcStates.ASSIGNED,
            transaction,
          );
          const data = {
            product: productToAssociate,
            epcs,
          };
          return { data: data };
        } catch (err) {
          this.productsZoneExceptions.epcAlreadyUse(err);
        }
      } else {
        this.productsZoneExceptions.productNoFound(body.productId);
      }
      //return this.productsZonesService.create(body);
    });
  }

  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-admin')
  @Post('return-products')
  async returnProducts(
    @UserAuth() token: TokenAuthEntity,
    @Body() createReturnDto: CreateReturnDto,
  ) {
    return await this.productsZonesService.returnProducts(
      token.employee,
      createReturnDto,
    );
  }

  /**
   * Find a product zone and details using the epc code and the employee
   * It is used in the mobile app by the sockets
   */
  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @Get('find-by-epc/:code')
  async findByEpcCode(
    @UserAuth() token: TokenAuthEntity,
    @Param('code') code: string,
  ) {
    //Find the epc to check if exits for that company
    const epc = await this.epcsService.findOneByCodeAndCompany(
      code,
      token.employee.companyId,
    );
    if (epc) {
      //Find the product zone
      const productZone = await this.productsZonesService.findOneByEpcId(
        epc.id,
      );
      if (productZone) {
        return productZone;
      } else {
        this.productsZoneExceptions.productsZoneNoFound(epc.code);
      }
    } else {
      this.productsZoneExceptions.epcNoFound(code);
    }
  }

  /**
   * Find products in store by epc code.
   * It is use by the admin in the mobile app
   */
  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-admin')
  @Get('find-in-local-by-epc/:code')
  async findInLocalByEpcCode(
    @UserAuth() token: TokenAuthEntity,
    @Param('code') code: string,
  ) {
    //Find the epc to check if exits for that company
    const epc = await this.epcsService.findOneByCodeAndCompany(
      code,
      token.employee.companyId,
    );
    if (epc) {
      const zones = await this.zonesService.findAllByShopId(
        token.employee.shopId,
      );
      if (zones) {
        const zonesId = _.map(zones, 'id');
        return await this.productsZonesService.findAllNoSoldByZoneAndEpc(
          zonesId,
          epc.id,
        );
      }
    } else {
      this.productsZoneExceptions.epcNoFound(code);
    }
  }
}
