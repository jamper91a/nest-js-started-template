import { Injectable } from '@nestjs/common';
import { CreateProductsZoneDto } from './dto/create-products-zone.dto';
import { UpdateProductsZoneDto } from './dto/update-products-zone.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsZone } from './entities/products-zone.entity';

@Injectable()
export class ProductsZonesService {
  constructor(
    @InjectModel(ProductsZone)
    private productsZoneModel: typeof ProductsZone,
  ) {}

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
