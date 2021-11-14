import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './entities/employee.entity';
import { User } from '../users/entities/user.entitity';
import { Shop } from '../shops/entities/shop.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { Zone } from '../zones/entities/zone.entity';
import { TypeListInventory } from '../inventories/dto/list-inventory.dto';
import { Op } from 'sequelize';

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

  async findByCompanyIdWithInventories(
    companyId: number,
    type: TypeListInventory,
    collaborative: boolean,
  ) {
    let where = null;
    if (type === TypeListInventory.CONSOLIDATED) {
      // consolidatedInventoryId > 1
      where = {
        [Op.or]: [{ [Op.gt]: 1 }, { [Op.not]: null }],
      };
    } else if (type === TypeListInventory.NO_CONSOLIDATED) {
      // consolidatedInventoryId == 1 or consolidatedInventoryId is null
      where = {
        [Op.or]: [1, { [Op.is]: null }],
      };
    } else if (TypeListInventory.ALL) {
      // consolidatedInventoryId >= 1 or consolidatedInventoryId is null
      where = {
        [Op.or]: [{ [Op.gte]: 1 }, { [Op.is]: null }],
      };
    }

    return await this.employeeModel.findAll({
      where: {
        companyId,
      },
      include: [
        {
          model: Inventory,
          include: [Zone],
          where: {
            consolidatedInventoryId: where,
            collaborative,
          },
        },
        Inventory,
      ],
      attributes: [],
    });
  }
}
