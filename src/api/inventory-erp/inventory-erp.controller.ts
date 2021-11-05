import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InventoryErpService } from './inventory-erp.service';
import { CreateInventoryErpDto } from './dto/create-inventory-erp.dto';
import { UpdateInventoryErpDto } from './dto/update-inventory-erp.dto';

@Controller('inventory-erp')
export class InventoryErpController {
  constructor(private readonly inventoryErpService: InventoryErpService) {}

  @Post()
  create(@Body() createInventoryErpDto: CreateInventoryErpDto) {
    return this.inventoryErpService.create(createInventoryErpDto);
  }

  @Get()
  findAll() {
    return this.inventoryErpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryErpService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryErpDto: UpdateInventoryErpDto,
  ) {
    return this.inventoryErpService.update(+id, updateInventoryErpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryErpService.remove(+id);
  }
}
