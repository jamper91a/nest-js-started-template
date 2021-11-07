import {
  BelongsTo,
  Column,
  ForeignKey,
  Is,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Group } from '../../groups/entities/group.entity';
import { Company } from '../../companies/entities/company.entity';
import { Dealer } from '../../dealers/entities/dealer.entity';
import { epcStates } from './epc-state.entity';

@Table({ tableName: 'epc' })
export class Epc extends Model {
  @Is('VALID_EPC_STATE', (value) => {
    for (const state of epcStates) {
      if (state.id === value) {
        return;
      }
    }
    throw new Error(`"${value}" is not a valid Epc state.`);
  })
  @Column
  state: number;

  @Unique
  @Column
  ecp: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Group;

  @ForeignKey(() => Dealer)
  @Column
  dealerId: number;

  @BelongsTo(() => Dealer)
  dealer: Dealer;
}
