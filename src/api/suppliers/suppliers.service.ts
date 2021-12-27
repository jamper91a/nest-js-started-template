import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Supplier } from './entities/supplier.entity';
import { Constants } from '../../util/constants';
import { Transaction } from 'sequelize';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier)
    private supplierModel: typeof Supplier,
  ) {}

  async create(createSupplierDto: CreateSupplierDto, transaction: Transaction) {
    return await this.supplierModel.create(createSupplierDto, { transaction });
  }

  findAll() {
    return `This action returns all suppliers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }

  /**
   * This will find the default supplier for a company
   */
  async findDefaultSupplier(companyId: number, transaction: Transaction) {
    return await this.supplierModel.findOne({
      where: {
        name: Constants.defaultSupplier.name,
        companyId,
      },
      transaction,
    });
  }

  async createDefaultSupplier(companyId: number, transaction: Transaction) {
    return await this.supplierModel.create(
      {
        name: Constants.defaultSupplier.name,
        companyId,
      },
      { transaction },
    );
  }

  async findByCompanyId(companyId: number, transaction: Transaction) {
    return await this.supplierModel.findAll({
      where: {
        companyId,
      },
      transaction,
    });
  }
}
