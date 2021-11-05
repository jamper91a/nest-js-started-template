import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from '../../employees/entities/employee.entity';

@Table({ tableName: 'employeesInventory' })
export class EmployeesInventory extends Model {
  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @BelongsTo(() => Employee)
  employee: Employee;
}
