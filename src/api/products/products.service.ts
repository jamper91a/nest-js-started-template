import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Op, Transaction } from 'sequelize';
import { Company } from '../companies/entities/company.entity';

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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
