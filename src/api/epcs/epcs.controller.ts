import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EpcsService } from './epcs.service';
import { CreateEpcDto } from './dto/create-epc.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { UserAuth } from '../../decorator/user.decorator';
import { EpcStates } from './entities/epc-state.entity';
import { CompaniesService } from '../companies/companies.service';
import { EpcExceptions } from './exceptions/epc.exceptions';
import { EpcsByCompanyMonthlyDto } from './dto/epcs-by-company-monthly.dto';

@ApiTags('Epcs')
@Controller('epcs')
export class EpcsController {
  constructor(
    private readonly epcsService: EpcsService,
    private readonly companiesService: CompaniesService,
    private readonly exceptions: EpcExceptions,
  ) {}

  @Roles(Constants.groups.dealer)
  @ApiBearerAuth('jwt-dealer')
  @Post()
  async create(
    @UserAuth() token: TokenAuthEntity,
    @Body() createEpcDto: CreateEpcDto,
  ) {
    //Check the company belongs to the reader
    const company = await this.companiesService.findOne(createEpcDto.companyId);
    if (company && company.dealerId === token.dealer.id) {
      //Set the dealer id of all the tokens
      for (const dto of createEpcDto.epcs) {
        dto.dealerId = token.dealer.id;
        dto.state = EpcStates.NOT_ASSIGNED;
        dto.companyId = createEpcDto.companyId;
      }
      try {
        return await this.epcsService.createSeveral(createEpcDto);
      } catch (e) {
        return this.exceptions.validationError(e);
      }
    } else {
      this.exceptions.companyNoValid();
    }
  }

  @Roles(Constants.groups.cashier, Constants.groups.warehouse)
  @ApiBearerAuth('jwt-employee')
  @Get(':code')
  async findOneByEpc(
    @UserAuth() token: TokenAuthEntity,
    @Param('code') code: string,
  ) {
    const result = await this.epcsService.findOneByCodeAndCompany(
      code,
      token.employee.companyId,
    );
    if (!result) {
      this.exceptions.epcNotFound();
    }
    return result;
  }

  /**
   * Web service to get the report of the amount of epcs that every company has used. It is used by the dealer
   * in the web page
   */
  @Roles(Constants.groups.dealer)
  @ApiBearerAuth('jwt-dealer')
  @ApiResponse({
    status: 200,
    type: EpcsByCompanyMonthlyDto,
    isArray: true,
  })
  @Get('stats-by-month/:companyId')
  async statsEpcByCompanyMonthly(
    @UserAuth() token: TokenAuthEntity,
    @Param('companyId') companyId: number,
  ) {
    return await this.epcsService.findEpcsByCompanyIdMonthly(
      companyId,
      token.dealer.id,
    );
  }

  /**
   * Get the amount of tags every dealer create by month. It is used by the dealer on the web site
   */
  @Roles(Constants.groups.dealer)
  @ApiBearerAuth('jwt-dealer')
  @ApiResponse({
    status: 200,
    type: EpcsByCompanyMonthlyDto,
    isArray: true,
  })
  @Get('stats-by-dealer/')
  async statsEpcByDealerMonthly(@UserAuth() token: TokenAuthEntity) {
    return await this.epcsService.findEpcsByDealerMonthly(token.dealer.id);
  }
}
