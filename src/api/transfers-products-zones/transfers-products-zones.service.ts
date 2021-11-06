import { Injectable } from '@nestjs/common';
import { CreateTransfersProductsZoneDto } from './dto/create-transfers-products-zone.dto';
import { UpdateTransfersProductsZoneDto } from './dto/update-transfers-products-zone.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TransfersProductsZone } from './entities/transfers-products-zone.entity';

@Injectable()
export class TransfersProductsZonesService {
  constructor(
    @InjectModel(TransfersProductsZone)
    private transfersProductZoneModel: typeof TransfersProductsZone,
  ) {}

  create(createTransfersProductsZoneDto: CreateTransfersProductsZoneDto) {
    return 'This action adds a new transfersProductsZone';
  }

  findAll() {
    return `This action returns all transfersProductsZones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transfersProductsZone`;
  }

  update(
    id: number,
    updateTransfersProductsZoneDto: UpdateTransfersProductsZoneDto,
  ) {
    return `This action updates a #${id} transfersProductsZone`;
  }

  remove(id: number) {
    return `This action removes a #${id} transfersProductsZone`;
  }
}
