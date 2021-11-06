import { PartialType } from '@nestjs/swagger';
import { CreateTransfersProductsZoneDto } from './create-transfers-products-zone.dto';

export class UpdateTransfersProductsZoneDto extends PartialType(CreateTransfersProductsZoneDto) {}
