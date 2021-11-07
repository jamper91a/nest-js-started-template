import { Column, Is, Model, Table } from 'sequelize-typescript';
import { returnTypes } from './return-type.entity';

@Table({ tableName: 'return' })
export class Return extends Model {
  @Column name: string;
  @Is('VALID_RETURN_TYPE', (value) => {
    for (const state of returnTypes) {
      if (state.id === value) {
        return;
      }
    }
    throw new Error(`"${value}" is not a valid Return type.`);
  })
  @Column({
    allowNull: true,
  })
  type?: number;
}
