import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';
import { CreateConsolidatedInventoryDto } from './dto/create-consolidated-inventory.dto';
import { UpdateConsolidatedInventoryDto } from './dto/update-consolidated-inventory.dto';

@Controller('consolidated-inventories')
export class ConsolidatedInventoriesController {
  constructor(private readonly consolidatedInventoriesService: ConsolidatedInventoriesService) {}

  @Post()
  create(@Body() createConsolidatedInventoryDto: CreateConsolidatedInventoryDto) {
    return this.consolidatedInventoriesService.create(createConsolidatedInventoryDto);
  }

  @Get()
  findAll() {
    return this.consolidatedInventoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consolidatedInventoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsolidatedInventoryDto: UpdateConsolidatedInventoryDto) {
    return this.consolidatedInventoriesService.update(+id, updateConsolidatedInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consolidatedInventoriesService.remove(+id);
  }
}
