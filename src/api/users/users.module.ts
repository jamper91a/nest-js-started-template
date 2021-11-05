import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Company} from "../companies/entities/company.entity";
import {User} from "./entities/user.entitity";

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
