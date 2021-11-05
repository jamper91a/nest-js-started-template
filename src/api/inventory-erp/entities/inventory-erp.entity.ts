import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'inventoryErp' })
export class InventoryErp extends Model {
  @Column products: string;
}
