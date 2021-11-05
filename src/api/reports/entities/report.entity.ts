import {
  BelongsTo,
  Column,
  ForeignKey,
  Is,
  Model,
  Table,
} from 'sequelize-typescript';
import { ConsolidatedInventory } from '../../consolidated-inventories/entities/consolidated-inventory.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { reportTypes } from './report-type.entity';

@Table({ tableName: 'reports' })
export class Report extends Model {
  @Is('VALID_REPORT_TYPE', (value) => {
    for (const state of reportTypes) {
      if (state.id === value) {
        return;
      }
    }
    throw new Error(`"${value}" is not a valid report type.`);
  })
  @Column
  type: number;
  @Column amount: number;
  @Column unitsSell: number;
  @Column unitsReturned: number;
  @Column firstDate: Date;
  @Column secondDate: Date;

  @ForeignKey(() => Employee)
  @Column
  employeeId: number;
  @BelongsTo(() => Employee)
  employee: Employee;

  @ForeignKey(() => ConsolidatedInventory)
  @Column
  firstInventoryId: number;
  @BelongsTo(() => ConsolidatedInventory)
  firstInventory: ConsolidatedInventory;

  @ForeignKey(() => ConsolidatedInventory)
  @Column
  secondInventoryId: number;
  @BelongsTo(() => ConsolidatedInventory)
  secondInventory: ConsolidatedInventory;
}
