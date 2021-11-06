import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  IsUrl,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entitity';
import { Dealer } from '../../dealers/entities/dealer.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Epc } from '../../epcs/entities/epc.entity';
import { Product } from '../../products/entities/product.entity';
import { Shop } from '../../shops/entities/shop.entity';

@Table({ tableName: 'companies' })
export class Company extends Model {
  @Column name: string;
  @IsUrl
  @Column({
    allowNull: true,
  })
  photo?: string;

  @HasMany(() => Employee)
  employees: Employee[];

  @HasMany(() => Epc)
  epcs: Epc[];

  @HasMany(() => Product)
  products: Product[];

  @HasMany(() => Shop)
  shops: Shop[];

  @ForeignKey(() => Dealer)
  @Column
  dealerId: number;

  @BelongsTo(() => Dealer)
  dealer: Dealer;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
