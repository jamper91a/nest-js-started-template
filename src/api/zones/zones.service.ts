import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZonesService {
  constructor(
    @InjectModel(Zone)
    private zoneModel: typeof Zone,
  ) {}

  async findAllByShopId(shopId: number) {
    return await this.zoneModel.findAll({
      where: {
        shopId,
      },
    });
  }
}
