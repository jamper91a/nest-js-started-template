import { MinLength } from 'class-validator';

export class CreateConsolidateInventoryDto {
  @MinLength(2)
  inventories: number[];
  name: string;
}
