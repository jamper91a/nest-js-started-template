import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entitity';

@Table({ tableName: 'returns-history' })
export class ReturnsHistory extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;
  @BelongsTo(() => User)
  user: User;
}
