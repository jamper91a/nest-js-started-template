import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UserAuth } from '../../decorator/user.decorator';
import { UserAuthEntity } from '../../auth/entities/user-auth';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  /**
   * Get the company using the id. It is used by the dealers or the company's manager
   * @param id Company's id. If is not given will use the id on the session
   */
  @Roles(Constants.groups.companyAdmin)
  @Get()
  async findOne(@UserAuth() user: UserAuthEntity) {
    return await this.companiesService.findCompanyByUserId(user.user.id);
  }

  @Roles(Constants.groups.admin)
  @Get('by-admin/:id')
  async findOneByAdmin(
    @UserAuth() user: UserAuthEntity,
    @Param('id') id: string,
  ) {
    return await this.companiesService.findOne(+id);
  }

  @Roles(Constants.groups.dealer)
  @Get('by-dealer/:id')
  async findOneByDealer(
    @UserAuth() user: UserAuthEntity,
    @Param('id') id: string,
  ) {
    return await this.companiesService.findOneByDealer(
      +id,
      user.user.dealer.id,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
