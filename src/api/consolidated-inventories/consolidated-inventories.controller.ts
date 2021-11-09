import { Controller, Get } from '@nestjs/common';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { UserAuthEntity } from '../../auth/entities/user-auth';

@ApiTags('Consolidated Inventories')
@Controller('consolidated-inventories')
export class ConsolidatedInventoriesController {
  constructor(
    private readonly consolidatedInventoriesService: ConsolidatedInventoriesService,
  ) {}

  /**
   * Find the last consolidated inventory of current user
   */
  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @Get('last')
  async lastInventory(@UserAuth() user: UserAuthEntity) {
    return await this.consolidatedInventoriesService.lastOneByEmployee(
      user.user.employee.id,
    );
  }
}
