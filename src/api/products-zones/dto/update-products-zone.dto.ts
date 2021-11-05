import { PartialType } from '@nestjs/swagger';
import { CreateProductsZoneDto } from './create-products-zone.dto';

export class UpdateProductsZoneDto extends PartialType(CreateProductsZoneDto) {}
