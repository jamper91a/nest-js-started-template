import { Body, Controller, Patch, Post } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { AttachInventoryDto } from './dto/attach-inventory.dto';
import { Sequelize } from 'sequelize-typescript';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { EmployeesInventoriesService } from '../employees-inventories/employees-inventories.service';
import { InventoriesProductsService } from '../inventories-products/inventories-products.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { InventoryExceptions } from './exceptions/inventory.exceptions';
import { InventoriesProductExceptions } from '../inventories-products/exceptions/inventories-product.exceptions';
import { EmployeesInventoryExceptions } from '../employees-inventories/exceptions/employees-inventory.exceptions';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { CreateInventoryResponseDto } from './response/create-inventory.response.dto';

@ApiTags('Inventories')
@Controller('inventories')
export class InventoriesController {
  constructor(
    private readonly inventoriesService: InventoriesService,
    private readonly sequelize: Sequelize,
    private readonly employeesInventoriesService: EmployeesInventoriesService,
    private readonly inventoriesProductsService: InventoriesProductsService,
    private readonly inventoriesExceptions: InventoryExceptions,
    private readonly inventoriesProductExceptions: InventoriesProductExceptions,
    private readonly employeesInventoryExceptions: EmployeesInventoryExceptions,
  ) {}

  /**
   * Web service that helps to join to an inventory already created.
   * This is used in the app for the employees'
   */
  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @Patch('attach')
  async attach(
    @UserAuth() token: TokenAuthEntity,
    @Body() dto: AttachInventoryDto,
  ) {
    const inventory = await this.inventoriesService.findOne(dto.inventoryId);
    if (inventory && inventory.collaborative) {
      return await this.sequelize.transaction(async (transaction) => {
        //Update the message
        const newMessage = `${token.employee.id}: ${dto.message}`;
        inventory.setDataValue(
          'message',
          inventory.getDataValue('message') + newMessage,
        );
        await inventory.save({ transaction });
        // Attach new users to the inventory
        try {
          await this.employeesInventoriesService.create(
            {
              employeeId: token.employee.id,
              inventoryId: inventory.id,
            },
            transaction,
          );
        } catch (e) {
          return this.employeesInventoryExceptions.employeesNoAssociated();
        }
        dto.products.forEach((ip) => (ip.inventoryId = inventory.id));
        try {
          await this.inventoriesProductsService.createSeveral(
            dto.products,
            transaction,
          );
        } catch (e) {
          return this.inventoriesProductExceptions.productsNoAssociated();
        }
      });
    } else {
      return this.inventoriesExceptions.inventoryIsNotCollaborative();
    }
  }

  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @ApiCreatedResponse({ type: CreateInventoryResponseDto })
  @Post('')
  async create(
    @UserAuth() token: TokenAuthEntity,
    @Body() dto: CreateInventoryDto,
  ) {
    dto.partial = true;
    dto.collaborative = false;
    return await this.sequelize.transaction(async (transaction) => {
      const inventory = await this.inventoriesService.create(dto, transaction);
      // Una vez creado el inventario, le asocio el usuario
      const employeesInventory = await this.employeesInventoriesService.create(
        {
          inventoryId: inventory.id,
          employeeId: token.employee.id,
        },
        transaction,
      );
      dto.inventoriesProduct.forEach(
        (product) => (product.inventoryId = inventory.id),
      );
      const inventoriesProduct =
        await this.inventoriesProductsService.createSeveral(
          dto.inventoriesProduct,
          transaction,
        );
      return {
        inventory,
        employeesInventory,
        inventoriesProduct,
      };
    });
  }
}
