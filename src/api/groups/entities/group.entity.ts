import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Group extends Model {
  @Column name: string;
}
