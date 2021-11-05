import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsZonesService } from './products-zones.service';
import { CreateProductsZoneDto } from './dto/create-products-zone.dto';
import { UpdateProductsZoneDto } from './dto/update-products-zone.dto';

@Controller('products-zones')
export class ProductsZonesController {
  constructor(private readonly productsZonesService: ProductsZonesService) {}

  @Post()
  create(@Body() createProductsZoneDto: CreateProductsZoneDto) {
    return this.productsZonesService.create(createProductsZoneDto);
  }

  @Get()
  findAll() {
    return this.productsZonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsZonesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductsZoneDto: UpdateProductsZoneDto,
  ) {
    return this.productsZonesService.update(+id, updateProductsZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsZonesService.remove(+id);
  }
}
