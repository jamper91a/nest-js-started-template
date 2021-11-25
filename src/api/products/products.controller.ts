import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
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
import { EpcsService } from '../epcs/epcs.service';
import { ProductsZonesService } from '../products-zones/products-zones.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly productExceptions: ProductExceptions,
    private readonly filesService: FilesService,
    private readonly sequelize: Sequelize,
    private readonly epcService: EpcsService,
    private readonly productsZonesService: ProductsZonesService,
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

  /**
   * Find one product by the ean/plu code. It is used in the app and the front-end
   * @param code
   */
  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-admin')
  @Get(':code')
  async findOne(
    @Param('code') code: string,
    @UserAuth() token: TokenAuthEntity,
  ) {
    const product = await this.productsService.findOneByCode(
      code,
      token.employee.companyId,
    );
    if (!product) {
      this.productExceptions.productNoFound();
    } else {
      return product;
    }
  }

  @Roles(
    Constants.groups.admin,
    Constants.groups.cashier,
    Constants.groups.warehouse,
  )
  @ApiBearerAuth('jwt-admin')
  @Get('by-epc/:code')
  async findOneByEpc(
    @Param('code') code: string,
    @UserAuth() token: TokenAuthEntity,
  ) {
    const epc = await this.epcService.findOneByCodeAndCompany(
      code,
      token.employee.companyId,
    );
    if (epc) {
      const productZone = await this.productsZonesService.findOneByEpc(epc.id);
      return productZone.product;
    }
  }
}
