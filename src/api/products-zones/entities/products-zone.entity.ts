import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';
import { Return } from '../../returns/entities/return.entity';
import { Epc } from '../../epcs/entities/epc.entity';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { epcStatesId } from '../../epcs/entities/epc-state.entity';

@Table({ tableName: 'productsZones' })
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
  returnId: number;

  @BelongsTo(() => Return)
  return: Return;

  @ForeignKey(() => Epc)
  @Column
  epcId: number;

  @BelongsTo(() => Epc)
  epc: Epc;

  @HasMany(() => Inventory) inventories: Inventory[];

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

  @BeforeUpdate
  static async productNoReturned(instance: ProductsZone) {
    if (instance.returnId > 1) {
      const productZone = await ProductsZone.findOne({
        where: {
          id: instance.id,
        },
      });
      if (productZone) {
        if (productZone.returnId > 1) {
          throw new Error('error_DEV02');
        }
      }
    }
  }
}
