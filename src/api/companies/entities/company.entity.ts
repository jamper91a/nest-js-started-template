import { Column, HasOne, IsUrl, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/entities/user';

@Table({ tableName: 'companies' })
export class Company extends Model {
  @Column name: string;
  @IsUrl
  @Column
  photo?: string;

  @HasOne(() => User)
  user: number;
}
