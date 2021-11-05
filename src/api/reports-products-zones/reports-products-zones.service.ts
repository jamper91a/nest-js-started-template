import { Injectable } from '@nestjs/common';
import { CreateReportsProductsZoneDto } from './dto/create-reports-products-zone.dto';
import { UpdateReportsProductsZoneDto } from './dto/update-reports-products-zone.dto';

@Injectable()
export class ReportsProductsZonesService {
  create(createReportsProductsZoneDto: CreateReportsProductsZoneDto) {
    return 'This action adds a new reportsProductsZone';
  }

  findAll() {
    return `This action returns all reportsProductsZones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportsProductsZone`;
  }

  update(id: number, updateReportsProductsZoneDto: UpdateReportsProductsZoneDto) {
    return `This action updates a #${id} reportsProductsZone`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportsProductsZone`;
  }
}
