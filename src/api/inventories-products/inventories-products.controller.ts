import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoriesProductsService } from './inventories-products.service';
import { CreateInventoriesProductDto } from './dto/create-inventories-product.dto';
import { UpdateInventoriesProductDto } from './dto/update-inventories-product.dto';

@Controller('inventories-products')
export class InventoriesProductsController {
  constructor(private readonly inventoriesProductsService: InventoriesProductsService) {}

  @Post()
  create(@Body() createInventoriesProductDto: CreateInventoriesProductDto) {
    return this.inventoriesProductsService.create(createInventoriesProductDto);
  }

  @Get()
  findAll() {
    return this.inventoriesProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoriesProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoriesProductDto: UpdateInventoriesProductDto) {
    return this.inventoriesProductsService.update(+id, updateInventoriesProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoriesProductsService.remove(+id);
  }
}
