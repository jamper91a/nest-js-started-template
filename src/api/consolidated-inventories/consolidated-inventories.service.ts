import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConsolidatedInventory } from './entities/consolidated-inventory.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { ProductsZone } from '../products-zones/entities/products-zone.entity';
import { Zone } from '../zones/entities/zone.entity';
import { Epc } from '../epcs/entities/epc.entity';
import { Product } from '../products/entities/product.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Sell } from '../sells/entities/sell.entity';
import { Return } from '../returns/entities/return.entity';
import { Company } from '../companies/entities/company.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Transaction } from 'sequelize';
import { ConsolidatedInventoryDto } from './dto/consolidated-inventory.dto';

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

  async findAll(companyId: number) {
    return await this.consolidatedInventoryModel.findAll({
      include: [
        {
          model: Employee,
          where: {
            companyId,
          },
          attributes: [],
        },
      ],
    });
  }

  async findByCollaborative(companyId: number, collaborative: boolean) {
    return await this.consolidatedInventoryModel.findAll({
      include: [
        {
          model: Employee,
          where: {
            companyId,
          },
          attributes: [],
        },
        {
          model: Inventory,
          where: {
            collaborative,
          },
        },
      ],
    });
  }

  async listProductsByConsolidatedInventory(id: number) {
    return await this.consolidatedInventoryModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Inventory,
          include: [
            {
              model: ProductsZone,
              include: [
                Zone,
                Epc,
                Sell,
                Return,
                {
                  model: Product,
                  include: [Company, Supplier],
                },
              ],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });
  }

  async create(dto: ConsolidatedInventoryDto, transaction: Transaction) {
    return await this.consolidatedInventoryModel.create(dto, { transaction });
  }
}
