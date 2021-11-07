import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';
import { Return } from '../../returns/entities/return.entity';
import { Epc } from '../../epcs/entities/epc.entity';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { epcStatesId } from '../../epcs/entities/epc-state.entity';
import { InventoryProduct } from '../../inventories-products/entities/inventories-product.entity';
import { Zone } from '../../zones/entities/zone.entity';
import { Sell } from '../../sells/entities/sell.entity';

@Table({ tableName: 'productZone' })
export class ProductsZone extends Model {
  @Column admissionDate: Date;
  @Column transferDate: Date;
  @Column sellDate: Date;
  @Column({ allowNull: true }) notesReturn?: string;
  @Column({ allowNull: true }) logsUsers?: string;
  @Column({ allowNull: true, defaultValue: false }) wasTransferred?: boolean;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Return)
  @Column
  returnId?: number;

  @BelongsTo(() => Return)
  return?: Return;

  @ForeignKey(() => Epc)
  @Column
  epcId: number;

  @BelongsTo(() => Epc)
  epc: Epc;

  @ForeignKey(() => Zone)
  @Column
  zoneId: number;

  @BelongsTo(() => Zone)
  zone: Zone;

  @ForeignKey(() => Sell)
  @Column
  sellId?: number;

  @BelongsTo(() => Sell)
  sell?: Sell;

  @BelongsToMany(() => Inventory, () => InventoryProduct)
  inventories: Inventory[];

  @BeforeCreate
  static async validateEpc(productsZone: ProductsZone) {
    const epc = await Epc.findOne({
      where: {
        id: productsZone.epcId,
        state: epcStatesId.NOT_ASSIGNED,
      },
    });

    if (!epc) {
      throw new Error('error_EPC01');
    }
  }

  // Check if this also work with bulk
  @BeforeUpdate
  static async productNoReturned(instance: ProductsZone) {
    if (instance.returnId > 1) {
      const productZone = await ProductsZone.findOne({
        where: {
          id: instance.id,
        },
      });
      //If the product is going to be returned, it should has been sold before and not returned
      if (productZone) {
        if (productZone.sellId <= 1) {
          throw new Error('error_DEV01');
        }
        if (productZone.returnId > 1) {
          throw new Error('error_DEV02');
        }
      }
    }
  }
}
