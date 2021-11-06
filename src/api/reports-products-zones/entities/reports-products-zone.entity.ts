import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Report } from '../../reports/entities/report.entity';
import { ProductsZone } from '../../products-zones/entities/products-zone.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Table({ tableName: 'reportsProductsZones' })
export class ReportsProductsZone extends Model {
  @ForeignKey(() => Report)
  @Column
  reportId: number;
  @BelongsTo(() => Report)
  report: Report;

  @ForeignKey(() => ProductsZone)
  @Column
  productsZoneId: number;
  @BelongsTo(() => ProductsZone)
  productsZone: ProductsZone;

  @ForeignKey(() => Employee)
  @Column
  homologatorEmployeeId: number;
  @BelongsTo(() => Employee)
  homologatorEmployee: Employee;
}
