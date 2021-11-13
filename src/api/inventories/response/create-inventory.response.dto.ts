import { EmployeeInventory } from '../../employees-inventories/entities/employees-inventory.entity';
import { InventoryProduct } from '../../inventories-products/entities/inventories-product.entity';
import { NewInventoryResponseDto } from './new-inventory.response.dto';

export class CreateInventoryResponseDto {
  inventory: NewInventoryResponseDto;
  employeesInventory: EmployeeInventory;
  inventoriesProduct: InventoryProduct[];
}
