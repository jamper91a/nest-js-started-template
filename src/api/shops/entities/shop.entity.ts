import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from '../../companies/entities/company.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Zone } from '../../zones/entities/zone.entity';

@Table({ tableName: 'shop' })
export class Shop extends Model {
  @Column name: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;
  @BelongsTo(() => Company)
  company: Company;

  @HasMany(() => Employee)
  employees: Employee[];

  @HasMany(() => Zone)
  zones: Zone[];
}
