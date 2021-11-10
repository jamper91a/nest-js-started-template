import { EpcStates } from '../entities/epc-state.entity';
import { ApiHideProperty } from '@nestjs/swagger';

class EpcDto {
  code: string;
  @ApiHideProperty()
  companyId: number;
  @ApiHideProperty()
  state: EpcStates;
  @ApiHideProperty()
  dealerId: number;
}

export class CreateEpcDto {
  epcs: EpcDto[];
  companyId: number;
}
