import {
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { Epc } from '../../epcs/entities/epc.entity';
import { Zone } from '../../zones/entities/zone.entity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';
import { epcStatesId } from '../../epcs/entities/epc-state.entity';

@Table({ tableName: 'inventoryProduct' })
export class InventoryProduct extends Model {
  @ForeignKey(() => Inventory)
  @Column
  inventoryId: number;

  @BelongsTo(() => Inventory)
  inventory: Inventory;

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

  @ForeignKey(() => ProductsZone)
  @Column
  productsZoneId: number;

  @BelongsTo(() => ProductsZone)
  productsZone: ProductsZone;

  @BeforeCreate
  static async validateProduct(inventoryProduct: InventoryProduct) {
    const productZone = await ProductsZone.findOne({
      where: {
        id: inventoryProduct.productsZoneId,
      },
      include: [Epc],
    });
    if (productZone) {
      if (productZone.epc.state !== epcStatesId.ASSIGNED) {
        throw new Error('error_IP03');
      }
    } else {
      throw new Error('error_IP01');
    }
  }
}
