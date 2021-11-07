import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'group' })
export class Group extends Model {
  @Column name: string;
}
