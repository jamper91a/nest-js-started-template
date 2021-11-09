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

  /**
   * List all the consolidated inventories of the company of the current user.
   * It will return even if they are collaborative or not. It is used in the front-end and app
   */
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

  /**
   * List all the consolidated inventories of the company of the current user filter by collaborative
   */
  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-admin')
  @Get('list-by-collaborative/:collaborative')
  async findByCollaborative(
    @Param('collaborative') collaborative: boolean,
    @UserAuth() token: TokenAuthEntity,
  ) {
    return await this.consolidatedInventoriesService.findByCollaborative(
      token.employee.companyId,
      collaborative,
    );
  }

  /**
   * Find the inventories belongs to a consolidated inventory, after get the products if each if the inventories
   * and return the information
   */
  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-admin')
  @Get('list-products/:id')
  async listProducts(@Param('id') id: number) {
    return await this.consolidatedInventoriesService.listProductsByConsolidatedInventory(
      id,
    );
  }
}
