import { ApiHideProperty } from '@nestjs/swagger';
import { CreateInventoriesProductDto } from '../../inventories-products/dto/create-inventories-product.dto';

export class CreateInventoryDto {
  @ApiHideProperty()
  partial: boolean;
  @ApiHideProperty()
  collaborative: boolean;
  message: string;
  zoneId: number;
  inventoriesProduct: CreateInventoriesProductDto[];
}
