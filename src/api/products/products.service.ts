import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Op, Transaction } from 'sequelize';
import { Company } from '../companies/entities/company.entity';
import { NewImportProduct } from './dto/import-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto, transaction: Transaction) {
    return await this.productModel.create(createProductDto, { transaction });
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOneByCode(code: string, companyId: number) {
    return await this.productModel.findOne({
      where: {
        [Op.or]: [{ ean: code }, { plu: code }, { plu2: code }, { plu3: code }],
        companyId,
      },
      include: [Company],
    });
  }

  async findOneById(id: number, companyId: number) {
    return await this.productModel.findOne({
      where: {
        id,
        companyId,
      },
      include: [Company],
    });
  }

  async findOneByCompany(companyId: number) {
    return await this.productModel.findAll({
      where: {
        companyId,
      },
      include: [Company],
    });
  }

  async createBulk(products: NewImportProduct[], transaction: Transaction) {
    return await this.productModel.bulkCreate(products, { transaction });
  }
}
