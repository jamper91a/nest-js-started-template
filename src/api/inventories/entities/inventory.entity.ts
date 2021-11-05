import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ConsolidatedInventory } from '../../consolidated-inventories/entities/consolidated-inventory.entity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';

@Table({ tableName: 'inventories' })
export class Inventory extends Model {
  @Column date: string;
  @Column partial: boolean;
  @Column collaborative: boolean;
  @Column message: string;

  @ForeignKey(() => ConsolidatedInventory)
  @Column
  consolidatedInventoryId: number;

  @BelongsTo(() => ConsolidatedInventory)
  consolidatedInventory: ConsolidatedInventory;

  @ForeignKey(() => ProductsZone) @Column productsZoneId: number;
  @BelongsTo(() => ProductsZone) productsZone: ProductsZone;
}
