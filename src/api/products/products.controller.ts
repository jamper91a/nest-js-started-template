import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FastifyFileInterceptor } from '../../interceptor/fastify-file-interceptor';
import { memoryStorage } from 'multer';
import { imageFileFilter } from '../../util/file-upload-util';
import { Request } from 'express';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { extname } from 'path';
import { FilesService } from '../../util/files.service';
import { Product } from './entities/product.entity';
import { Sequelize } from 'sequelize-typescript';
import { ProductExceptions } from './exceptions/product.exceptions';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly productExceptions: ProductExceptions,
    private readonly filesService: FilesService,
    private sequelize: Sequelize,
  ) {}

  /**
   * Web service that create a product for a company.
   * It is used from the front end by the admin of the company
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FastifyFileInterceptor('photo', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  async create(
    @Req() req: Request,
    @Body() body: CreateProductDto,
    @UserAuth() token: TokenAuthEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.sequelize.transaction(async (transaction) => {
      try {
        body.companyId = token.company.id;
        delete body.image;
        const product: Product = await this.productsService.create(
          body,
          transaction,
        );
        if (product) {
          if (file) {
            const path = `uploads/company/${token.company.id}/product`;
            const fileName = `product-${product.id}${extname(
              file.originalname,
            )}`;
            const destination = this.filesService.uploadFile(
              path,
              fileName,
              file,
            );
            if (destination) {
              product.image = destination;
              try {
                await product.save({ transaction });
                return true;
              } catch (e) {
                this.logger.error(e);
                this.filesService.removeFile(path, fileName);
                this.productExceptions.productNoUpdated();
              }
            } else {
              this.productExceptions.photoNoSaved();
            }
          } else {
            return true;
          }
        }
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
