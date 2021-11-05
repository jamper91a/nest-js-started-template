import { Column, HasOne, IsUrl, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entitity';
import { Dealer } from '../../dealers/entities/dealer.entity';

@Table({ tableName: 'companies' })
export class Company extends Model {
  @Column name: string;
  @IsUrl
  @Column({
    allowNull: true,
  })
  photo?: string;

  @HasOne(() => User)
  user: User;
  @HasOne(() => Dealer)
  dealer: Dealer;
}
