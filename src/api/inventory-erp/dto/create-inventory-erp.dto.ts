export class ProductInventoryErpDto {
  ean: string;
  total: number;
}

export class CreateInventoryErpDto {
  products: ProductInventoryErpDto[];
}
