import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entitity';
import { Shop } from '../../shops/entities/shop.entity';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { EmployeesInventory } from '../../employees-inventories/entities/employees-inventory.entity';

@Table
export class Employee extends Model {
  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @ForeignKey(() => User)
  @Unique
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Shop)
  @Column
  shopId: number;

  @BelongsTo(() => Shop)
  shop: Shop;

  @BelongsToMany(() => Inventory, () => EmployeesInventory)
  inventories: Inventory;
}
