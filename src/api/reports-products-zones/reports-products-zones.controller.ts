import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportsProductsZonesService } from './reports-products-zones.service';
import { CreateReportsProductsZoneDto } from './dto/create-reports-products-zone.dto';
import { UpdateReportsProductsZoneDto } from './dto/update-reports-products-zone.dto';

@Controller('reports-products-zones')
export class ReportsProductsZonesController {
  constructor(
    private readonly reportsProductsZonesService: ReportsProductsZonesService,
  ) {}

  @Post()
  create(@Body() createReportsProductsZoneDto: CreateReportsProductsZoneDto) {
    return this.reportsProductsZonesService.create(
      createReportsProductsZoneDto,
    );
  }

  @Get()
  findAll() {
    return this.reportsProductsZonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsProductsZonesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReportsProductsZoneDto: UpdateReportsProductsZoneDto,
  ) {
    return this.reportsProductsZonesService.update(
      +id,
      updateReportsProductsZoneDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsProductsZonesService.remove(+id);
  }
}
