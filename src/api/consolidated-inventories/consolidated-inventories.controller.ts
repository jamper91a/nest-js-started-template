import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { ConsolidatedInventoriesExceptions } from './exceptions/consolidated-inventories.exceptions';
import { CreateConsolidateInventoryDto } from '../inventories/dto/create-consolidate-inventory.dto';
import { ProductsZone } from '../products-zones/entities/products-zone.entity';
import { Sequelize } from 'sequelize-typescript';
import { EmployeesInventoriesService } from '../employees-inventories/employees-inventories.service';
import { InventoriesProductsService } from '../inventories-products/inventories-products.service';
import { InventoryExceptions } from '../inventories/exceptions/inventory.exceptions';
import { InventoriesProductExceptions } from '../inventories-products/exceptions/inventories-product.exceptions';
import { EmployeesInventoryExceptions } from '../employees-inventories/exceptions/employees-inventory.exceptions';
import { InventoriesService } from '../inventories/inventories.service';

@ApiTags('Consolidated Inventories')
@Controller('consolidated-inventories')
export class ConsolidatedInventoriesController {
  constructor(
    private readonly consolidatedInventoriesService: ConsolidatedInventoriesService,
    private readonly exceptions: ConsolidatedInventoriesExceptions,
    private readonly sequelize: Sequelize,
    private readonly employeesInventoriesService: EmployeesInventoriesService,
    private readonly inventoriesProductsService: InventoriesProductsService,
    private readonly inventoriesService: InventoriesService,
    private readonly inventoriesExceptions: InventoryExceptions,
    private readonly inventoriesProductExceptions: InventoriesProductExceptions,
    private readonly employeesInventoryExceptions: EmployeesInventoryExceptions,
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

  /**
   * This web service will consolidate 2 or more parcial inventories. Must be from
   * difference dates but from the same zone
   * @param token
   * @param dto
   */
  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @Patch('consolidate-inventories')
  async createConsolidateInventory(
    @UserAuth() token: TokenAuthEntity,
    @Body() dto: CreateConsolidateInventoryDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    let totalProducts = 0;
    return await this.sequelize.transaction(async (transaction) => {
      const inventories = await this.inventoriesService.findAllById(
        dto.inventories,
        ['id', 'zoneId', 'consolidatedInventoryId'],
        [ProductsZone],
      );
      if (inventories && inventories.length > 1) {
        const zones = inventories.map((i) => i.zoneId);
        const inventoriesValidation = inventories.every(function (
          inventory,
          index,
        ) {
          totalProducts += inventory.productsZone.length;
          //Valido que los inventories sean de zonas diferentes
          if (zones.includes(inventory.zoneId, index + 1)) {
            throw self.inventoriesExceptions.notSameZone();
            // Valido que los inventories no se hayan consolidado antes
          } else if (inventory.consolidatedInventoryId) {
            //sails.helpers.printError({title: 'alreadyConsolidated', message: ''}, this.req, inventory);
            throw self.inventoriesExceptions.inventoryAlreadyConsolidated(
              inventory,
            );
          } else {
            return true;
          }
        });

        if (inventoriesValidation) {
        }
      } else {
        throw self.inventoriesExceptions.inventoriesNoValid();
      }

      //1 -> Se crea un nuevo inventario consolidado.
      const consolidatedInventory =
        await this.consolidatedInventoriesService.create(
          {
            employeeId: token.employee.id,
            name: dto.name,
            totalProducts: totalProducts,
          },
          transaction,
        );
      //2 -> Se asocian los inventarios parciales al inventario consolidado
      await this.inventoriesService.updateConsolidatedInventory(
        dto.inventories,
        consolidatedInventory.id,
        transaction,
      );
      return {
        inventories,
        consolidatedInventory,
      };
    });
  }
}
