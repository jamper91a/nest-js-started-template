import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Shop } from '../../shops/entities/shop.entity';

@Table({ tableName: 'inventoryErp' })
export class InventoryErp extends Model {
  @Column({
    type: DataType.JSON,
  })
  products: InventoryErpProduct[];
  @ForeignKey(() => Shop)
  @Column
  shopId: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}

class InventoryErpProduct {
  ean: string;
  total: number;
}
