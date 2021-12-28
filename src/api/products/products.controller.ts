import {
  Body,
  Controller,
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
import { ImportProductsDto } from './dto/import-products.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { CreateSupplierDto } from '../suppliers/dto/create-supplier.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
    private readonly suppliersService: SuppliersService,
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

  /**
   * Find one product by the id. It is used in the front-end by the admin when a product is going to be edit
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Get('by-id/:id')
  async findOneById(
    @Param('id') id: number,
    @UserAuth() token: TokenAuthEntity,
  ) {
    const product = await this.productsService.findOneById(
      id,
      token.company.id,
    );
    if (product) {
      return product;
    } else {
      this.productExceptions.productNoFound();
    }
  }

  /**
   * Find all the products of a company. It is used by the front-end by the admin
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Get('by-company')
  async findByCompany(@UserAuth() token: TokenAuthEntity) {
    const products = await this.productsService.findOneByCompany(
      token.company.id,
    );
    if (products) {
      return products;
    } else {
      this.productExceptions.productNoFound();
    }
  }

  /**
   * Web service that would allow to create several products at the same time.
   * It would be used in the front-end. It is used by the company's manager
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Post('import-products')
  async importProducts(
    @UserAuth() token: TokenAuthEntity,
    @Body() dto: ImportProductsDto,
  ) {
    const companyId = token.company.id;
    //Set companyId to every product
    const products = dto.products.map((product) => {
      product.companyId = companyId;
      return product;
    });
    try {
      await this.sequelize.transaction(async (t) => {
        let defaultSupplier = await this.suppliersService.findDefaultSupplier(
          companyId,
          t,
        );
        //If there is not default supplier, I create one
        if (!defaultSupplier) {
          defaultSupplier = await this.suppliersService.createDefaultSupplier(
            companyId,
            t,
          );
        }
        //Find all supplier of this company
        const allSuppliers = await this.suppliersService.findByCompanyId(
          companyId,
          t,
        );
        //Set the supplierId for every product
        for (const product of products) {
          //Product does not have a supplier name, we attach the default One
          if (!product.supplier) {
            product.supplierId = defaultSupplier.id;
          } else {
            let supplier = null;
            /**
             * We look if the name of the supplier provided match with any of previous suppliers
             * for this company
             */

            if (allSuppliers) {
              supplier = allSuppliers.find((supplier) => {
                return (
                  supplier.name.toLowerCase() === product.supplier.toLowerCase()
                );
              });
            }
            if (!supplier) {
              const createSupplierDto: CreateSupplierDto = {
                name: product.supplier,
                companyId,
              };
              supplier = await this.suppliersService.create(
                createSupplierDto,
                t,
              );
              //Add new supplier to the list so we do not have to create him again
              allSuppliers.push(supplier);
            }
            product.supplierId = supplier.id;
          }
        }
        await this.productsService.createBulk(products, t);
        return {};
      });
    } catch (err) {
      this.productExceptions.productNoImported(err);
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }

  /**
   * Web service that update a product for a company.
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
  @Patch('update-product/')
  async update(
    @Req() req: Request,
    @Body() body: UpdateProductDto,
    @UserAuth() token: TokenAuthEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log(body);
    this.logger.debug(body);
    const companyId = token.company.id;
    return await this.sequelize.transaction(async (transaction) => {
      try {
        let path = '';
        let fileName = '';
        if (file) {
          path = `uploads/company/${companyId}/product`;
          fileName = `product-${body.id}${extname(file.originalname)}`;
          const destination = this.filesService.uploadFile(
            path,
            fileName,
            file,
          );
          if (destination) {
            body.image = destination;
          } else {
            this.productExceptions.photoNoSaved();
          }
        } else {
          delete body.image;
        }
        try {
          await this.productsService.update(body, transaction);
          return true;
        } catch (e) {
          this.logger.error(e);
          this.filesService.removeFile(path, fileName);
          this.productExceptions.productNoUpdated();
        }
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    });
  }
}
