import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DealersService } from './dealers.service';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../decorator/user.decorator';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { CompaniesByDealerDto } from './dto/companies-by-dealer.dto';
import { Public } from '../../decorator/public.decorator';

@ApiTags('Dealers')
@Controller('dealers')
export class DealersController {
  constructor(private readonly dealersService: DealersService) {}

  @Public()
  @Post()
  async create(@Body() createDealerDto: CreateDealerDto) {
    createDealerDto.user.groupId = Constants.groups.dealer;
    createDealerDto.user.active = true;
    return await this.dealersService.create(createDealerDto);
  }

  /**
   * Get the companies that a dealer has created
   */
  @Post('get-companies')
  @Roles(Constants.groups.dealer)
  async getCompanies(
    @UserAuth() token: TokenAuthEntity,
    @Body() dto: CompaniesByDealerDto,
  ) {
    return await this.dealersService.getCompanies(
      token.dealer.id,
      dto.justActiveCompanies,
    );
  }

  @Get()
  findAll() {
    return this.dealersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealerDto: UpdateDealerDto) {
    return this.dealersService.update(+id, updateDealerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealersService.remove(+id);
  }
}
