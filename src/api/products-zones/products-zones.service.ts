import { Injectable, Logger } from '@nestjs/common';
import { CreateProductsZoneDto } from './dto/create-products-zone.dto';
import { UpdateProductsZoneDto } from './dto/update-products-zone.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsZone } from './entities/products-zone.entity';
import { ReturnsHistoryService } from '../returns-history/returns-history.service';
import { Sequelize } from 'sequelize-typescript';
import { ProductsZonesExceptions } from './exceptions/products-zones.exceptions';
import { Employee } from '../employees/entities/employee.entity';
import { CreateReturnsHistoryDto } from '../returns-history/dto/create-returns-history.dto';
import { CreateReturnDto } from './dto/create-return.dto';

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

  create(createProductsZoneDto: CreateProductsZoneDto) {
    return 'This action adds a new productsZone';
  }

  findAll() {
    return `This action returns all productsZones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsZone`;
  }

  update(id: number, updateProductsZoneDto: UpdateProductsZoneDto) {
    return `This action updates a #${id} productsZone`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsZone`;
  }

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
}
