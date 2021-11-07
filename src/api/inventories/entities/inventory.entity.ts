import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ConsolidatedInventory } from '../../consolidated-inventories/entities/consolidated-inventory.entity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';
import { InventoriesProduct } from '../../inventories-products/entities/inventories-product.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { EmployeesInventory } from '../../employees-inventories/entities/employees-inventory.entity';
import { Zone } from '../../zones/entities/zone.entity';

@Table
export class Inventory extends Model {
  @Column date: Date;
  @Column partial: boolean;
  @Column collaborative: boolean;
  @Column message: string;

  @ForeignKey(() => ConsolidatedInventory)
  @AllowNull
  @Column
  consolidatedInventoryId?: number;

  @BelongsTo(() => ConsolidatedInventory)
  consolidatedInventory?: ConsolidatedInventory;

  @BelongsToMany(() => ProductsZone, () => InventoriesProduct)
  productsZone: ProductsZone[];

  @BelongsToMany(() => Employee, () => EmployeesInventory)
  employees: Employee[];

  @ForeignKey(() => Zone)
  @Column
  zoneId: number;

  @BelongsTo(() => Zone)
  zone: Zone;
}
