import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from '../../companies/entities/company.entity';

@Table({ tableName: 'suppliers' })
export class Supplier extends Model {
  @Column name: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;
  @BelongsTo(() => Company)
  company: Company;
}
