import { Body, Controller, Get, Param, Patch, Req, Res } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { UserAuth } from '../../decorator/user.decorator';
import { UserAuthEntity } from '../../auth/entities/user-auth';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyExceptions } from './exceptions/company.exceptions';
import { TasksService } from '../../util/tasks.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import fastify = require('fastify');

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly companyExceptions: CompanyExceptions,
    private readonly tasksService: TasksService,
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

  //
  // @Public()
  // @Post('/uploadFile')
  // async uploadFile(
  //   @Req() req: fastify.FastifyRequest,
  //   @Res() res: fastify.FastifyReply<any>,
  // ): Promise<any> {
  //   return await this.tasksService.uploadFile(req, res);
  // }

  @Roles(Constants.groups.admin)
  @ApiBearerAuth('jwt-admin')
  @Patch()
  async update(
    @Body() dto: UpdateCompanyDto,
    @Req() req: fastify.FastifyRequest,
    @Res() res: fastify.FastifyReply<any>,
    @UserAuth() user: UserAuthEntity,
  ) {
    const company = await this.companiesService.findCompanyByUserId(
      user.user.id,
    );
    if (company) {
      if (dto.withPhoto) {
        const filePath = 'logo/' + company.name;
        await this.tasksService.uploadFile(filePath, req, res);
      }
    } else {
      this.companyExceptions.companyNotFound();
    }
  }
}
