import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { Group } from '../../groups/entities/group.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Dealer } from '../../dealers/entities/dealer.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  name: string;
  @IsEmail
  @Unique({
    name: 'DuplicateEmail',
    msg: 'Email already exits',
  })
  @Column
  username: string;
  @Column
  password: string;
  @Column
  username_rfdi?: string;
  @Column
  password_rfdi?: string;
  @Column
  active: boolean;

  @ForeignKey(() => Group)
  @Column
  groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  @HasOne(() => Employee)
  employee: Employee;

  @HasOne(() => Dealer)
  dealer: Dealer;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword(user: User) {
    if (user.password && user.password !== user.previous('password')) {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
    } else {
      user.password = user.previous('password');
    }
  }
}
