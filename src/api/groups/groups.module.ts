import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Company} from "../companies/entities/company.entity";
import {Group} from "./entities/group.entity";

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [SequelizeModule.forFeature([Group])],
})
export class GroupsModule {}
