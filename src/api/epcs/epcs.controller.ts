import { Body, Controller, Post } from '@nestjs/common';
import { EpcsService } from './epcs.service';
import { CreateEpcDto } from './dto/create-epc.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/roles.decorator';
import { Constants } from '../../util/constants';
import { TokenAuthEntity } from '../../auth/entities/user-auth';
import { UserAuth } from '../../decorator/user.decorator';
import { EpcStates } from './entities/epc-state.entity';
import { CompaniesService } from '../companies/companies.service';
import { EpcExceptions } from './exceptions/epc.exceptions';

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
}
