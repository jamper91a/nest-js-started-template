import { Column, Model, Table } from 'sequelize-typescript';
@Table({ tableName: 'consolidated_inventories' })
export class ConsolidatedInventory extends Model {
  @Column name: string;
  @Column totalProducts: number;
}
