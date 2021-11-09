import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConsolidatedInventory } from './entities/consolidated-inventory.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { ProductsZone } from '../products-zones/entities/products-zone.entity';
import { Zone } from '../zones/entities/zone.entity';
import { Epc } from '../epcs/entities/epc.entity';
import { Product } from '../products/entities/product.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class ConsolidatedInventoriesService {
  constructor(
    @InjectModel(ConsolidatedInventory)
    private consolidatedInventoryModel: typeof ConsolidatedInventory,
  ) {}

  async lastOneByEmployee(employeeId: number, companyId: number) {
    return await this.consolidatedInventoryModel.findOne({
      where: {
        employeeId,
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Inventory,
          include: [
            {
              model: ProductsZone,
              include: [Zone, Epc, Product],
              through: {
                attributes: [],
              },
            },
          ],
        },
        {
          model: Employee,
          where: {
            companyId,
          },
        },
      ],
    });
  }
}
