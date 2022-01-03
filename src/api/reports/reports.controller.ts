import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
}
