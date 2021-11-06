import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZonesService {
  constructor(
    @InjectModel(Zone)
    private zoneModel: typeof Zone,
  ) {}

  create(createZoneDto: CreateZoneDto) {
    return 'This action adds a new zone';
  }

  findAll() {
    return `This action returns all zones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zone`;
  }

  update(id: number, updateZoneDto: UpdateZoneDto) {
    return `This action updates a #${id} zone`;
  }

  remove(id: number) {
    return `This action removes a #${id} zone`;
  }
}
