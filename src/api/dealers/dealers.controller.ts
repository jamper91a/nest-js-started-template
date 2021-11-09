import { Body, Controller, Get, Post } from '@nestjs/common';
import { DealersService } from './dealers.service';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { CompaniesByDealerDto } from './dto/companies-by-dealer.dto';

@ApiTags('Dealers')
@Controller('dealers')
export class DealersController {
  constructor(private readonly dealersService: DealersService) {}

  @Roles(Constants.groups.superAdmin)
  @ApiBearerAuth('jwt-sadmin')
  @Post()
  async create(@Body() createDealerDto: CreateDealerDto) {
    createDealerDto.user.groupId = Constants.groups.dealer;
    createDealerDto.user.active = true;
    return await this.dealersService.create(createDealerDto);
  }

  /**
   * Get the companies that a dealer has created
   */

  @Roles(Constants.groups.dealer)
  @ApiBearerAuth('jwt-dealer')
  @Post('get-companies')
  async getCompanies(
    @UserAuth() token: TokenAuthEntity,
    @Body() dto: CompaniesByDealerDto,
  ) {
    return await this.dealersService.getCompanies(
      token.dealer.id,
      dto.justActiveCompanies,
    );
  }

  @Roles(Constants.groups.superAdmin)
  @ApiBearerAuth('jwt-sadmin')
  @Get('get-active')
  findAllActive() {
    return this.dealersService.findAllActive();
  }

  @Roles(Constants.groups.superAdmin)
  @ApiBearerAuth('jwt-sadmin')
  @Get('')
  findAll() {
    return this.dealersService.findAll();
  }
}
