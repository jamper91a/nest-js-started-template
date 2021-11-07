import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entitity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';
import { Product } from '../../products/entities/product.entity';

@Table
export class ReturnsHistory extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;
  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => ProductsZone)
  @Column
  productsZoneId: number;
  @BelongsTo(() => ProductsZone)
  productsZone: ProductsZone;

  @ForeignKey(() => User)
  @Column
  userId: number;
  @BelongsTo(() => User)
  user: User;
}
