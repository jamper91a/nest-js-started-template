import { PartialType } from '@nestjs/swagger';
import { CreateConsolidatedInventoryDto } from './create-consolidated-inventory.dto';

export class UpdateConsolidatedInventoryDto extends PartialType(CreateConsolidatedInventoryDto) {}
