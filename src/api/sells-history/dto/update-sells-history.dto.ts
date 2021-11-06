import { PartialType } from '@nestjs/swagger';
import { CreateSellsHistoryDto } from './create-sells-history.dto';

export class UpdateSellsHistoryDto extends PartialType(CreateSellsHistoryDto) {}
