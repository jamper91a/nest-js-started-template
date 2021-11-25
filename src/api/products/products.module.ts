import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { FilesService } from '../../util/files.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, FilesService],
  imports: [SequelizeModule.forFeature([Product])],
})
export class ProductsModule {}
