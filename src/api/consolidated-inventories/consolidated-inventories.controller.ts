import { Controller, Get, Param } from '@nestjs/common';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { ConsolidatedInventoriesExceptions } from './exceptions/consolidated-inventories.exceptions';

@ApiTags('Consolidated Inventories')
@Controller('consolidated-inventories')
export class ConsolidatedInventoriesController {
  constructor(
    private readonly consolidatedInventoriesService: ConsolidatedInventoriesService,
    private readonly exceptions: ConsolidatedInventoriesExceptions,
  ) {}

  /**
   * Find the last consolidated inventory of current user
   */
  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @Get('last')
  async lastInventory(@UserAuth() token: TokenAuthEntity) {
    /**
     * Here the companyId is not really required but we must send it
     */
    return await this.consolidatedInventoriesService.lastOneByEmployee(
      token.employee.id,
      token.employee.companyId,
    );
  }

  /**
   * Find the last consolidated inventory of current user
   * It is used by company admin on the web page'
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Get('last-by-employee/:id')
  async lastInventoryByEmployeeIs(
    @Param('id') id: string,
    @UserAuth() token: TokenAuthEntity,
  ) {
    /**
     * To avoid admin consulting data from employess differen company
     */
    const result = await this.consolidatedInventoriesService.lastOneByEmployee(
      +id,
      token.company.id,
    );
    if (!result) {
      this.exceptions.employeeNotValid();
    }
    return result;
  }

  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-admin')
  @Get('list-all')
  async findAll(@UserAuth() token: TokenAuthEntity) {
    return await this.consolidatedInventoriesService.findAll(
      token.employee.companyId,
    );
  }
}
