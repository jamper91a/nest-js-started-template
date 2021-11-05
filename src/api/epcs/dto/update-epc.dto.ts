import { PartialType } from '@nestjs/swagger';
import { CreateEpcDto } from './create-epc.dto';

export class UpdateEpcDto extends PartialType(CreateEpcDto) {}
