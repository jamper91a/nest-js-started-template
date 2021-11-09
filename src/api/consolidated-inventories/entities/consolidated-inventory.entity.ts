import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from '../../employees/entities/employee.entity';
import { Inventory } from '../../inventories/entities/inventory.entity';

@Table({ tableName: 'consolidatedInventory' })
export class ConsolidatedInventory extends Model {
  @Column name: string;
  @Column totalProducts: number;

  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @BelongsTo(() => Employee)
  employee: Employee;

  @HasMany(() => Inventory)
  inventories: Inventory[];
}
