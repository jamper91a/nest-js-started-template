import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'groups',
})
export class Group extends Model {
  @Column name: string;
}
