import { PartialType } from '@nestjs/swagger';
import { CreateReturnsHistoryDto } from './create-returns-history.dto';

export class UpdateReturnsHistoryDto extends PartialType(
  CreateReturnsHistoryDto,
) {}
