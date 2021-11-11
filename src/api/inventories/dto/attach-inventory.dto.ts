import { CreateInventoriesProductDto } from '../../inventories-products/dto/create-inventories-product.dto';

export class AttachInventoryDto {
  inventoryId: number;
  message: string;
  products: CreateInventoriesProductDto[];
}
