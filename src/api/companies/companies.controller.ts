import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { UserAuth } from '../../decorator/user.decorator';
import { UserAuthEntity } from '../../auth/entities/user-auth';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CompanyExceptions } from './exceptions/company.exceptions';
import { FilesService } from '../../util/files.service';
import { FastifyFileInterceptor } from '../../interceptor/fastify-file-interceptor';
import { memoryStorage } from 'multer';
import { imageFileFilter } from '../../util/file-upload-util';
import { Request } from 'express';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { extname } from 'path';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly companyExceptions: CompanyExceptions,
    private readonly filesService: FilesService,
  ) {}

  /**
   * Get the company using the id. It will use the id on the session
   */
  @Roles(Constants.groups.companyAdmin)
  @ApiBearerAuth('jwt-company')
  @Get()
  async findOne(@UserAuth() user: UserAuthEntity) {
    const company = await this.companiesService.findCompanyByUserId(
      user.user.id,
    );
    if (!company) {
      this.companyExceptions.companyNotFound();
    }
    return company;
  }

  /**
   * Get the company using the id. It is use by admin
   * @param id Company id
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Get('by-admin/:id')
  async findOneByAdmin(
    @UserAuth() user: UserAuthEntity,
    @Param('id') id: string,
  ) {
    const company = await this.companiesService.findOne(+id);
    if (!company) {
      this.companyExceptions.companyNotFound();
    }
    return company;
  }

  /**
   * Get the company using the id. It is use by dealer, the company must belong to that dealer
   * @param id
   */
  @Roles(Constants.groups.dealer)
  @ApiBearerAuth('jwt-dealer')
  @Get('by-dealer/:id')
  async findOneByDealer(
    @UserAuth() user: UserAuthEntity,
    @Param('id') id: string,
  ) {
    const company = await this.companiesService.findOneByDealer(
      +id,
      user.user.dealer.id,
    );
    if (!company) {
      this.companyExceptions.companyNotFound();
    }
    return company;
  }

  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FastifyFileInterceptor('logo', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  @Patch()
  async update(
    @Req() req: Request,
    @Body() body: UpdateCompanyDto,
    @UserAuth() user: UserAuthEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const path = `uploads/company/${user.user.company.id}`;
      const fileName = `logo${extname(file.originalname)}`;
      const destination = this.filesService.uploadFile(path, fileName, file);
      body.photo = destination;
    } else {
      delete body.photo;
    }
    console.log(body);
    console.log(file);

    await this.companiesService.update(user.user.company.id, body);
    return {};
  }
}
