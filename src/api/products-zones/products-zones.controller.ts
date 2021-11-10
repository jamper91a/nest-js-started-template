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
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { CreateReturnDto } from './dto/create-return.dto';

@ApiTags('ProductsZones')
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

  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-admin')
  @Post('return-products')
  returnProducts(
    @UserAuth() token: TokenAuthEntity,
    @Body() createReturnDto: CreateReturnDto,
  ) {
    return this.productsZonesService.returnProducts(
      token.employee,
      createReturnDto,
    );
  }
}
