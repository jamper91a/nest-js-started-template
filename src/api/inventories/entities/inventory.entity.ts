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
import { InventoryProduct } from '../../inventories-products/entities/inventories-product.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { EmployeeInventory } from '../../employees-inventories/entities/employees-inventory.entity';
import { Zone } from '../../zones/entities/zone.entity';

@Table({ tableName: 'inventory' })
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

  @BelongsToMany(() => ProductsZone, () => InventoryProduct)
  productsZone: ProductsZone[];

  @BelongsToMany(() => Employee, () => EmployeeInventory)
  employees: Employee[];

  @ForeignKey(() => Zone)
  @Column
  zoneId: number;

  @BelongsTo(() => Zone)
  zone: Zone;
}
