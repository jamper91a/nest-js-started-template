import { Employee } from '../../employees/entities/employee.entity';

export class FindInLocalByIdDto {
  productId: number;
  employee?: Employee;
}
