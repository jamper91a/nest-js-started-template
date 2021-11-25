import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CompanyExceptions } from './exceptions/company.exceptions';
import { FilesService } from '../../util/files.service';
import { Request } from 'express';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { extname } from 'path';
import { FastifyFileInterceptor } from '../../interceptor/fastify-file-interceptor';
import { imageFileFilter } from '../../util/file-upload-util';
import { memoryStorage } from 'multer';
import { CreatePdfTestDto } from './dto/create-pdf-test.dto';
import { Public } from '../../decorator/public.decorator';
import { PdfService } from '../../services/pdf/pdf.service';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly companyExceptions: CompanyExceptions,
    private readonly filesService: FilesService,
    private readonly pdfService: PdfService,
  ) {}

  /**
   * Get the company using the id. It will use the id on the session
   */
  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Get()
  async findOne(@UserAuth() token: TokenAuthEntity) {
    const company = await this.companiesService.findCompanyByUserId(
      token.user.id,
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
  @Roles(Constants.groups.superAdmin)
  @ApiBearerAuth('jwt-admin')
  @Get('by-admin/:id')
  async findOneByAdmin(
    @UserAuth() token: TokenAuthEntity,
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
    @UserAuth() token: TokenAuthEntity,
    @Param('id') id: string,
  ) {
    const company = await this.companiesService.findOneByDealer(
      +id,
      token.dealer.id,
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
    @UserAuth() token: TokenAuthEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const path = `uploads/company/${token.company.id}`;
      const fileName = `logo${extname(file.originalname)}`;
      const destination = this.filesService.uploadFile(path, fileName, file);
      body.photo = destination;
    } else {
      delete body.photo;
    }

    await this.companiesService.update(token.company.id, body);
    return {};
  }

  @Public()
  @Post('pdf')
  async pdf(@Body() body: CreatePdfTestDto) {
    this.pdfService.generatePdf(body.templateId, body.data);
  }
}
