export enum TypeListInventory {
  CONSOLIDATED = 'CONSOLIDATED',
  NO_CONSOLIDATED = 'NO_CONSOLIDATED',
  ALL = 'ALL',
}

export class ListInventoryDto {
  type: TypeListInventory;
  collaborative: boolean;
}
