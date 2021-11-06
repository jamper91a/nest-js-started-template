import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from '../../employees/entities/employee.entity';
import { Shop } from '../../shops/entities/shop.entity';

@Table({ tableName: 'suppliers' })
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
}
