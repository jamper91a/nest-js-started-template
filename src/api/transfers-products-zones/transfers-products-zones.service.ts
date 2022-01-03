import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransfersProductsZone } from './entities/transfers-products-zone.entity';

@Injectable()
export class TransfersProductsZonesService {
  constructor(
    @InjectModel(TransfersProductsZone)
    private transfersProductZoneModel: typeof TransfersProductsZone,
  ) {}

  async findAllByProductZone(productsZoneId: number) {
    return await this.transfersProductZoneModel.findAll({
      where: {
        productsZoneId,
      },
    });
  }
}
