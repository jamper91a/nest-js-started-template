import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ConsolidatedInventory } from '../../consolidated-inventories/entities/consolidated-inventory.entity';

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
}
