enum Return {
  NO_RETURNED = 'NO_RETURNED',
  WARRANTY_CLIENT = 'WARRANTY_CLIENT',
  SIZE_CLIENT = 'SIZE_CLIENT',
  DISREPAIR_CLIENT = 'DISREPAIR_CLIENT',
  WARRANTY_SUPPLIER = 'WARRANTY_SUPPLIER',
  SIZE_SUPPLIER = 'SIZE_SUPPLIER',
  DISREPAIR_SUPPLIER = 'DISREPAIR_SUPPLIER',
}

class ProductZone {
  id: number;
  productId: number;
  epcId: number;
  returnId: Return;
  notesReturn: string;
}

export class CreateReturnDto {
  productsZone: ProductZone[];
}
