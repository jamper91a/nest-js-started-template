import { PartialType } from '@nestjs/swagger';
import { CreateInventoriesProductDto } from './create-inventories-product.dto';

export class UpdateInventoriesProductDto extends PartialType(CreateInventoriesProductDto) {}
