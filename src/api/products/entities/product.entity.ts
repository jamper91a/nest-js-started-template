import {
  BelongsTo,
  Column,
  ForeignKey,
  IsUrl,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from '../../companies/entities/company.entity';

@Table({ tableName: 'products' })
export class Product extends Model {
  @Column ean: string;
  @Column plu: string;
  @Column plu2: string;
  @Column plu3: string;
  @Column branch: string;
  @Column gender: string;
  @Column color: string;
  @Column size: string;
  @Column category: string;
  @Column description: string;
  @Column amount: number;
  @IsUrl @Column({ allowNull: true }) image?: string;
  @Column costPrice: number;
  @Column sellPrice: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
