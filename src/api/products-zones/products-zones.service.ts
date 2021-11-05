import { Injectable } from '@nestjs/common';
import { CreateProductsZoneDto } from './dto/create-products-zone.dto';
import { UpdateProductsZoneDto } from './dto/update-products-zone.dto';

@Injectable()
export class ProductsZonesService {
  create(createProductsZoneDto: CreateProductsZoneDto) {
    return 'This action adds a new productsZone';
  }

  findAll() {
    return `This action returns all productsZones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsZone`;
  }

  update(id: number, updateProductsZoneDto: UpdateProductsZoneDto) {
    return `This action updates a #${id} productsZone`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsZone`;
  }
}
