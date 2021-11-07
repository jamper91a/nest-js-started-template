import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './entities/employee.entity';
import { User } from '../users/entities/user.entitity';
import { Shop } from '../shops/entities/shop.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  async findByCompanyId(companyId: number) {
    return await this.employeeModel.findAll({
      where: {
        companyId,
      },
      include: [User, Shop],
    });
  }
}
