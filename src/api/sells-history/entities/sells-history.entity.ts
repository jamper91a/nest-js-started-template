import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';
import { User } from '../../users/entities/user.entitity';

@Table
export class SellsHistory extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;
  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => ProductsZone)
  @Column
  productZoneId: number;
  @BelongsTo(() => ProductsZone)
  productZone: ProductsZone;

  @ForeignKey(() => User)
  @Column
  userId: number;
  @BelongsTo(() => User)
  user: User;
}
