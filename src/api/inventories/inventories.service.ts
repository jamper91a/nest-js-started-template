import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from './entities/inventory.entity';
import { literal, Transaction } from 'sequelize';
import { FindAttributeOptions, Includeable } from 'sequelize/types/lib/model';
import { Zone } from '../zones/entities/zone.entity';
import { ProductsZone } from '../products-zones/entities/products-zone.entity';
import { Product } from '../products/entities/product.entity';
import { Return } from '../returns/entities/return.entity';
import { Sell } from '../sells/entities/sell.entity';
import { Epc } from '../epcs/entities/epc.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectModel(Inventory)
    private inventoryModel: typeof Inventory,
  ) {}

  async create(
    createInventoryDto: CreateInventoryDto,
    transaction: Transaction,
  ) {
    return await this.inventoryModel.create(createInventoryDto, {
      transaction,
    });
  }

  findAll() {
    return `This action returns all inventories`;
  }

  async findOne(id: number) {
    return this.inventoryModel.findOne({ where: { id } });
  }

  async findAllById(
    id: number[],
    attributes?: FindAttributeOptions,
    include?: Includeable[],
  ) {
    return this.inventoryModel.findAll({ where: { id }, attributes, include });
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }

  updateInventoryMessage(
    id: number,
    newMessage: string,
    transaction: Transaction,
  ) {
    return this.inventoryModel.update(
      {
        message: literal('messages' + '.' + newMessage),
      },
      {
        where: { id },
        transaction,
      },
    );
  }

  async updateConsolidatedInventory(
    ids: number[],
    consolidatedInventoryId: number,
    transaction: Transaction,
  ) {
    return await this.inventoryModel.update(
      { consolidatedInventoryId },
      { where: { id: ids }, transaction },
    );
  }

  async findProductsById(id: number) {
    return this.inventoryModel.findOne({
      where: {
        id,
      },
      include: [
        Zone,
        {
          model: ProductsZone,
          include: [Product, Zone, Return, Sell, Epc],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: [],
    });
  }

  async findAllProductsZoneByConsolidatedInventory(
    consolidatedInventoryId: number,
  ): Promise<ProductsZone[]> {
    //Find all inventories of the first consolidated inventory
    const inventories = await this.inventoryModel.findAll({
      where: {
        consolidatedInventoryId,
      },
      include: [
        {
          model: ProductsZone,
          include: [Zone, Epc, Product],
        },
      ],
    });
    // Add the products of the first inventory to an var
    let productsInInventory: ProductsZone[] = [];
    for (const inventory of inventories)
      productsInInventory = productsInInventory.concat(inventory.productsZone);
    return productsInInventory;
  }
}
