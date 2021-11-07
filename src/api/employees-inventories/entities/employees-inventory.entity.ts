import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from '../../employees/entities/employee.entity';
import { Inventory } from '../../inventories/entities/inventory.entity';

@Table
export class EmployeesInventory extends Model {
  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @BelongsTo(() => Employee)
  employee: Employee;

  @ForeignKey(() => Inventory)
  @Column
  inventoryId: number;

  @BelongsTo(() => Inventory)
  inventory: Inventory;
}
