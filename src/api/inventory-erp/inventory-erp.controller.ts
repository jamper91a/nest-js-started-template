import { Body, Controller, Post } from '@nestjs/common';
import { InventoryErpService } from './inventory-erp.service';
import { CreateInventoryErpDto } from './dto/create-inventory-erp.dto';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';

@ApiTags('Inventory-Erp')
@Controller('inventory-erp')
export class InventoryErpController {
  constructor(private readonly inventoryErpService: InventoryErpService) {}

  /**
   * Create an inventory ERP on the system, so admins can compare.
   * It is used on the web by the admins
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Post()
  async create(
    @UserAuth() token: TokenAuthEntity,
    @Body() dto: CreateInventoryErpDto,
  ) {
    return await this.inventoryErpService.create(
      token.employee.shopId,
      dto.products,
    );
  }
}
