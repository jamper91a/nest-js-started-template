import { Column, Model, Table } from 'sequelize-typescript';
@Table({ tableName: 'returns' })
export class Return extends Model {
  @Column name: string;
  @Column({
    allowNull: true,
  })
  type?: number;
}
