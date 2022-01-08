import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { ReturnsByTypeDto } from './dto/returns-by-type.dto';
import { ZonesService } from '../zones/zones.service';
import _ from 'underscore';
import { ReturnsService } from '../returns/returns.service';
import { ProductsZonesService } from '../products-zones/products-zones.service';
import { InventoriesService } from '../inventories/inventories.service';
import { ReportsExceptions } from './exceptions/reports.exceptions';
import { UtilService } from '../../util/util.service';
import { TransfersProductsZonesService } from '../transfers-products-zones/transfers-products-zones.service';
import { DifferenceWithInventoryErpDto } from './dto/difference-with-inventory-erp.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { InventoryErpService } from '../inventory-erp/inventory-erp.service';
import { reportTypesId } from './entities/report-type.entity';
import { EmployeesService } from '../employees/employees.service';

@ApiTags('Report')
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly zonesService: ZonesService,
    private readonly returnsService: ReturnsService,
    private readonly productsZonesService: ProductsZonesService,
    private readonly inventoriesService: InventoriesService,
    private readonly reportsExceptions: ReportsExceptions,
    private readonly utilService: UtilService,
    private readonly transfersProductsZonesService: TransfersProductsZonesService,
    private readonly sequelize: Sequelize,
    private readonly inventoryErpService: InventoryErpService,
    private readonly employeesService: EmployeesService,
  ) {}

  /**
   * Action that will list the return in the system by type (customer or supplier)
   */
  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-employee')
  @Post('returns-by-type')
  async returnsByType(
    @UserAuth() token: TokenAuthEntity,
    @Body() body: ReturnsByTypeDto,
  ) {
    if (!body.employee) {
      body.employee = token.employee;
    }

    const zones = await this.zonesService.findAllByShopId(body.employee.shopId);
    const zonesId = _.map(zones, 'id');
    const returns = await this.returnsService.findByType(body.type);
    const returnsId = _.map(returns, 'id');
    return await this.productsZonesService.findAllForReturnsReport(
      body.firstDate,
      body.secondDate,
      returnsId,
      zonesId,
    );
  }

  /**
   * This web service it would find the difference between two consolidate inventories.
   * It would check how many products were not found.
   * A product is not found if is not in both inventories and it has not being sold or
   * transferred
   */
  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-employee')
  @Get('difference-between-inventories/:first/:second')
  async differenceBetweenInventories(
    @UserAuth() token: TokenAuthEntity,
    @Param('first') first: number,
    @Param('second') second: number,
  ) {
    let productsZoneFirstInventory =
      await this.inventoriesService.findAllProductsZoneByConsolidatedInventory(
        first,
      );
    let productsZoneSecondInventory =
      await this.inventoriesService.findAllProductsZoneByConsolidatedInventory(
        second,
      );
    const notFoundProducts = [];

    //In case first inventory does not have data, I will switch to the second to be able to fill the no found products
    if (
      productsZoneFirstInventory.length === 0 &&
      productsZoneSecondInventory.length > 0
    ) {
      productsZoneFirstInventory = productsZoneSecondInventory;
      //I know one of them is empty
      productsZoneSecondInventory = [];
    } else if (
      productsZoneFirstInventory.length === 0 &&
      productsZoneSecondInventory.length === 0
    ) {
      this.reportsExceptions.productsNoFound();
    }
    //Search for the products of the first inventory in the second inventory
    for (const firstProductZone of productsZoneFirstInventory) {
      const found = productsZoneSecondInventory.find(
        (productZone) => productZone.id === firstProductZone.id,
      );
      //If the product was not found I will check if it was sold or transfer
      if (!found) {
        if (firstProductZone.sellId && firstProductZone.sellId <= 1) {
          if (
            !this.utilService.exitsInArray(notFoundProducts, firstProductZone)
          ) {
            notFoundProducts.push(firstProductZone);
          }
        } else {
          //Search for the product in the transfer table
          const transfer =
            await this.transfersProductsZonesService.findAllByProductZone(
              firstProductZone.id,
            );
          if (!transfer) {
            if (
              !this.utilService.exitsInArray(notFoundProducts, firstProductZone)
            )
              notFoundProducts.push(firstProductZone);
          }
        }
      }
    }
    return notFoundProducts;
  }

  /**
   * Compare local inventory with one erp inventory uploaded by the user.
   */
  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-employee')
  @Post('difference-with-inventory-erp/')
  async differenceWithInventoryErp(
    @UserAuth() token: TokenAuthEntity,
    @Body() dto: DifferenceWithInventoryErpDto,
  ) {
    const employee = dto.employee ? dto.employee : token.employee;
    const totalProductsQuery = `
            SELECT COUNT(1) as total,
                   p.id,
                   p.size,
                   ean,
                   plu,
                   plu2,
                   plu3,
                   description,
                   imagen
            FROM products_has_zones phz,
                 products p,
                 zones z
            WHERE p.company_id = $1
              AND phz.product_id = p.id
              AND phz.zone_id = z.id
              AND z.shop_id = $2
            GROUP BY p.id, p.size, p.ean, p.plu, p.plu2, p.plu3, description, imagen;`;
    const allProducts: any[] = await this.sequelize.query(totalProductsQuery, {
      replacements: [employee.companyId, employee.shopId],
      type: QueryTypes.SELECT,
    });
    const lastInventoryErp = await this.inventoryErpService.findAllByShopId(
      employee.shopId,
    );
    let lastInventoryErpProducts = [];
    if (allProducts && lastInventoryErp) {
      if (lastInventoryErp && lastInventoryErp.length > 0)
        lastInventoryErpProducts = lastInventoryErp[0].products;
      for (const product of allProducts) {
        product.erp = 0;
        for (const erpProduct of lastInventoryErpProducts) {
          if (
            product.ean === erpProduct.ean ||
            product.plu === erpProduct.plu ||
            product.plu2 === erpProduct.plu2 ||
            product.plu3 === erpProduct.plu3
          ) {
            product.erp = erpProduct.total;
          }
        }
      }
    }
    return allProducts;
  }

  /**
   * Get a report by an id. It is use in the mobile app
   */
  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @Get(':id')
  async findById(@UserAuth() token: TokenAuthEntity, @Param('id') id: number) {
    const report = await this.reportsService.findById(id);
    return report;
  }

  /**
   * Return the reports in the db. It is used in the mobile app
   */
  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @ApiParam({ name: 'type', enum: reportTypesId })
  @Get('type/:type')
  async findByType(@UserAuth() token: TokenAuthEntity, @Param('type') type) {
    switch (type) {
      case reportTypesId.DIFFERENCE_PHYSICAL_UNITS:
        const employees = await this.employeesService.findByCompanyId(
          token.company.id,
        );
        const employeesId = employees.map((e) => e.id);
        const reports = await this.reportsService.findByTypeAndEmployeeId(
          type,
          employeesId,
        );
        return reports;
        break;
    }
  }
}
