import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { Group } from '../../groups/entities/group.entity';
@Table({
  tableName: 'users',
})
export class UserEntity extends Model {
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

  @BeforeCreate
  @BeforeUpdate
  static hashPassword(user: UserEntity) {
    if (user.password && user.password !== user.previous('password')) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    } else {
      user.password = user.previous('password');
    }
  }
}
