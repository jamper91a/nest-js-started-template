import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from '../../employees/entities/employee.entity';
import { Shop } from '../../shops/entities/shop.entity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';
import { TransfersProductsZone } from '../../transfers-products-zones/entities/transfers-products-zone.entity';

@Table({ tableName: 'transfer' })
export class Transfer extends Model {
  @Column state: boolean;
  @Column manifest: string;
  @Column message: string;

  @ForeignKey(() => Employee)
  @Column
  employeeId: number;
  @BelongsTo(() => Employee)
  employee: Employee;

  @ForeignKey(() => Shop)
  @Column
  shopSourceId: number;
  @BelongsTo(() => Shop)
  shopSource: Shop;

  @ForeignKey(() => Shop)
  @Column
  shopDestinationId: number;
  @BelongsTo(() => Shop)
  shopDestination: Shop;

  @BelongsToMany(() => ProductsZone, () => TransfersProductsZone)
  productsZone: ProductsZone;
}
