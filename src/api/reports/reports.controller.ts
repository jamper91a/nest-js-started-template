import { Body, Controller, Post } from '@nestjs/common';
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

@ApiTags('Report')
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly zonesService: ZonesService,
    private readonly returnsService: ReturnsService,
    private readonly productsZonesService: ProductsZonesService,
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
    return await this.productsZonesService.findForReturnsReport(
      body.firstDate,
      body.secondDate,
      returnsId,
      zonesId,
    );
  }
}
