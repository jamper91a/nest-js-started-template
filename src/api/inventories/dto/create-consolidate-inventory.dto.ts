import { ArrayMinSize } from 'class-validator';

export class CreateConsolidateInventoryDto {
  @ArrayMinSize(2)
  inventories: number[];
  name: string;
}
