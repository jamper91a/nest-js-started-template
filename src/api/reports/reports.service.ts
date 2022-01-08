import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';
import { ReportsProductsZone } from '../reports-products-zones/entities/reports-products-zone.entity';
import { Op } from 'sequelize';
import { ProductsZone } from '../products-zones/entities/products-zone.entity';
import { Epc } from '../epcs/entities/epc.entity';
import { Zone } from '../zones/entities/zone.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report)
    private reportModel: typeof Report,
  ) {}

  async findById(id: number) {
    return await this.reportModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ReportsProductsZone,
          where: {
            homologatorEmployee: {
              [Op.is]: null,
            },
          },
          include: [
            {
              model: ProductsZone,
              include: [Zone, Epc, Product],
            },
          ],
        },
      ],
    });
  }

  async findByTypeAndEmployeeId(type: number, employeeId: number[]) {
    return await this.reportModel.findAll({
      where: {
        type,
        employeeId,
      },
    });
  }
}
