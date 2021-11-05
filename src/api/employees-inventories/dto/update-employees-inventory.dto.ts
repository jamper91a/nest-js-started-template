import { PartialType } from '@nestjs/swagger';
import { CreateEmployeesInventoryDto } from './create-employees-inventory.dto';

export class UpdateEmployeesInventoryDto extends PartialType(
  CreateEmployeesInventoryDto,
) {}
