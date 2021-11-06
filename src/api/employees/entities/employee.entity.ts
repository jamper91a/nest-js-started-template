import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entitity';
import { Shop } from '../../shops/entities/shop.entity';

@Table({ tableName: 'employees' })
export class Employee extends Model {
  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Shop)
  @Column
  shopId: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}
