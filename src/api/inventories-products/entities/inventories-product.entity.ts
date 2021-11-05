import {
  BeforeUpdate,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { Epc } from '../../epcs/entities/epc.entity';

@Table({ tableName: 'inventoriesProducts' })
export class InventoriesProduct extends Model {
  @ForeignKey(() => Inventory)
  @Column
  inventoryId: number;

  @BelongsTo(() => Inventory)
  inventory: Inventory;

  @ForeignKey(() => Epc)
  @Column
  epcId: number;

  @BelongsTo(() => Epc)
  epc: Epc;

  @BeforeUpdate
  static validateProduct(inventoryProduct: InventoriesProduct) {
    return null;
  }
}
