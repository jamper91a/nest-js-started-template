import { PartialType } from '@nestjs/swagger';
import { CreateInventoryErpDto } from './create-inventory-erp.dto';

export class UpdateInventoryErpDto extends PartialType(CreateInventoryErpDto) {}
