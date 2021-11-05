import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entitity';
import { Company } from '../../companies/entities/company.entity';

@Table({ tableName: 'dealers' })
export class Dealer extends Model {
  @Column name: string;

  @HasMany(() => Company)
  companies: Company[];

  @ForeignKey(() => User)
  @Column
  user_id: number;
  @BelongsTo(() => User)
  user: User;
}
