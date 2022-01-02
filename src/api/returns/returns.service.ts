import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Return } from './entities/return.entity';
import { ReturnType } from '../reports/dto/returns-by-type.dto';

@Injectable()
export class ReturnsService {
  private readonly logger = new Logger(ReturnsService.name);

  constructor(
    @InjectModel(Return)
    private returnModel: typeof Return,
  ) {}

  async findByType(type: ReturnType) {
    return await this.returnModel.findAll({
      where: {
        type: type.valueOf(),
      },
    });
  }
}
