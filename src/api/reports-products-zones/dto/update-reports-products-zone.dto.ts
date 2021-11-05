import { PartialType } from '@nestjs/swagger';
import { CreateReportsProductsZoneDto } from './create-reports-products-zone.dto';

export class UpdateReportsProductsZoneDto extends PartialType(CreateReportsProductsZoneDto) {}
