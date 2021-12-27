import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { FilesService } from '../../util/files.service';
import { ProductExceptions } from './exceptions/product.exceptions';
import { EpcsModule } from '../epcs/epcs.module';
import { ProductsZonesModule } from '../products-zones/products-zones.module';
import { SuppliersModule } from '../suppliers/suppliers.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, FilesService, ProductExceptions],
  imports: [
    SequelizeModule.forFeature([Product]),
    EpcsModule,
    ProductsZonesModule,
    SuppliersModule,
  ],
})
export class ProductsModule {}
