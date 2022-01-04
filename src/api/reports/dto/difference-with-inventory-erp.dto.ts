import { Employee } from '../../employees/entities/employee.entity';
import { IsOptional } from 'class-validator';

export class DifferenceWithInventoryErpDto {
  @IsOptional()
  employee?: Employee;
}
