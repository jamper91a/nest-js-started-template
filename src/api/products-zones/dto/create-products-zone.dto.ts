import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class ProductsZoneDto {
  zoneId: number;
  code: string;

  @ApiHideProperty()
  productId?: number;
  @ApiHideProperty()
  devolutionId?: number;
  @ApiHideProperty()
  sellId?: number;
  @ApiHideProperty()
  epcId?: number;
}

export class CreateProductsZoneDto {
  productId: number;
  @ValidateNested({ each: true })
  @Type(() => ProductsZoneDto)
  products: ProductsZoneDto[];
}
