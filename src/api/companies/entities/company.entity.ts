import {
  BelongsTo,
  Column,
  ForeignKey,
  IsUrl,
  Model,
  Table,
} from 'sequelize-typescript';
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

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Dealer)
  @Column
  dealerId: number;

  @BelongsTo(() => Dealer)
  dealer: Dealer;
}
