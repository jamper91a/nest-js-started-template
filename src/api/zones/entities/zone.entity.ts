import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Shop } from '../../shops/entities/shop.entity';

@Table({ tableName: 'zone' })
export class Zone extends Model {
  @Column name: string;
  @ForeignKey(() => Shop)
  @Column
  shopId: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}
