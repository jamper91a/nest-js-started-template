import {
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  Is,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import {
  transfersProductsZoneState,
  transfersProductsZoneStateId,
} from './transfers-products-zone-state.entity';
import { Transfer } from '../../transfers/entities/transfer.entity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';

@Table({ tableName: 'transfersProductsZones' })
export class TransfersProductsZone extends Model {
  @Is('VALID_TRANSFER_STATE', (value) => {
    for (const state of transfersProductsZoneState) {
      if (state.id === value) {
        return;
      }
    }
    throw new Error(`"${value}" is not a valid Transfer state.`);
  })
  @Column
  state: boolean;

  @ForeignKey(() => Transfer)
  @Column
  transferId: number;

  @BelongsTo(() => Transfer)
  transfer: Transfer;

  @ForeignKey(() => ProductsZone)
  @Unique
  @Column
  productsZoneId: number;

  @BelongsTo(() => ProductsZone)
  productsZone: ProductsZone;

  @BeforeCreate
  static async validateProducts(transfersProductsZone: TransfersProductsZone) {
    const result = await TransfersProductsZone.findOne({
      where: {
        productsZoneId: transfersProductsZone.productsZoneId,
        state: transfersProductsZoneStateId.NOT_RECEIVED,
      },
    });
    if (result) {
      throw new Error('error_PZHT01');
    }
  }
}
