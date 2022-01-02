import { Injectable, Logger } from '@nestjs/common';
import { ProductsZoneDto } from './dto/create-products-zone.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsZone } from './entities/products-zone.entity';
import { ReturnsHistoryService } from '../returns-history/returns-history.service';
import { Sequelize } from 'sequelize-typescript';
import { ProductsZonesExceptions } from './exceptions/products-zones.exceptions';
import { Employee } from '../employees/entities/employee.entity';
import { CreateReturnsHistoryDto } from '../returns-history/dto/create-returns-history.dto';
import { CreateReturnDto } from './dto/create-return.dto';
import { Op, Transaction } from 'sequelize';
import { Product } from '../products/entities/product.entity';
import { Sell } from '../sells/entities/sell.entity';
import { Return } from '../returns/entities/return.entity';
import { Zone } from '../zones/entities/zone.entity';
import { Shop } from '../shops/entities/shop.entity';
import { Epc } from '../epcs/entities/epc.entity';

@Injectable()
export class ProductsZonesService {
  private readonly logger = new Logger(ProductsZonesService.name);

  constructor(
    @InjectModel(ProductsZone)
    private productsZoneModel: typeof ProductsZone,
    private returnsHistoryService: ReturnsHistoryService,
    private sequelize: Sequelize,
    private exceptions: ProductsZonesExceptions,
  ) {}

  async returnProducts(employee: Employee, createReturnDto: CreateReturnDto) {
    //Create all the returnHistoryObjects
    const history: CreateReturnsHistoryDto[] = [];
    for (const productZone of createReturnDto.productsZone) {
      const returnHistory: CreateReturnsHistoryDto = {
        userId: employee.userId,
        productId: productZone.productId,
        productsZoneId: productZone.id,
      };
      history.push(returnHistory);
    }
    try {
      return await this.sequelize.transaction(async (t) => {
        try {
          for (const productZone of createReturnDto.productsZone) {
            await this.productsZoneModel.update(productZone, {
              where: { epcId: productZone.epcId },
              transaction: t,
            });
          }
        } catch (e) {
          this.logger.error(e);
          throw this.exceptions.productsNoReturned();
        }
        try {
          console.log(history);
          this.logger.debug(history.toString());
          await this.returnsHistoryService.createSeveral(history, t);
        } catch (e) {
          this.logger.error(e);
          throw this.exceptions.historyNoCreated();
        }

        return;
      });
    } catch (e) {
      throw e;
    }
  }

  async findOneByEpc(epcId: number) {
    return await this.productsZoneModel.findOne({
      where: {
        epcId,
      },
    });
  }

  async createBulk(productsZone: ProductsZoneDto[], transaction: Transaction) {
    return await this.productsZoneModel.bulkCreate(productsZone, {
      transaction,
    });
  }

  async findOneByEpcId(epcId: number) {
    return await this.productsZoneModel.findOne({
      where: {
        epcId: epcId,
      },
      include: [
        Product,
        Sell,
        Return,
        {
          model: Zone,
          include: [Shop],
        },
      ],
    });
  }

  async findAllNoSoldByZoneAndEpc(zonesId: number[], epcId: number) {
    return await this.productsZoneModel.findAll({
      where: {
        zoneId: zonesId,
        epcId,
        sellId: {
          [Op.or]: [{ [Op.gt]: 2 }, { [Op.is]: null }],
        },
      },
      include: [Product, Zone, Epc],
    });
  }

  async findAllNoSoldByZoneAndProduct(zonesId: number[], productId: number) {
    return await this.productsZoneModel.findAll({
      where: {
        zoneId: zonesId,
        productId,
        sellId: {
          [Op.or]: [{ [Op.gt]: 2 }, { [Op.is]: null }],
        },
      },
      include: [Product, Zone, Epc],
    });
  }
}
