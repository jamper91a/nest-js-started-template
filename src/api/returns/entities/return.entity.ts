import { Column, Table } from 'sequelize-typescript';
@Table({ tableName: 'returns' })
export class Return {
  @Column name: string;
  @Column({
    allowNull: true,
  })
  type?: number;
}
