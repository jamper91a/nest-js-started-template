import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entitity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';

@Table
export class Sell extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ProductsZone)
  productsZone: ProductsZone[];
}
