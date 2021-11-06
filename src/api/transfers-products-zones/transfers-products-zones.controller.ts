import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TransfersProductsZonesService } from './transfers-products-zones.service';
import { CreateTransfersProductsZoneDto } from './dto/create-transfers-products-zone.dto';
import { UpdateTransfersProductsZoneDto } from './dto/update-transfers-products-zone.dto';

@Controller('transfers-products-zones')
export class TransfersProductsZonesController {
  constructor(
    private readonly transfersProductsZonesService: TransfersProductsZonesService,
  ) {}

  @Post()
  create(
    @Body() createTransfersProductsZoneDto: CreateTransfersProductsZoneDto,
  ) {
    return this.transfersProductsZonesService.create(
      createTransfersProductsZoneDto,
    );
  }

  @Get()
  findAll() {
    return this.transfersProductsZonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transfersProductsZonesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransfersProductsZoneDto: UpdateTransfersProductsZoneDto,
  ) {
    return this.transfersProductsZonesService.update(
      +id,
      updateTransfersProductsZoneDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transfersProductsZonesService.remove(+id);
  }
}
