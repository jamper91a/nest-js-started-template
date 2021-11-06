import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SellsHistoryService } from './sells-history.service';
import { CreateSellsHistoryDto } from './dto/create-sells-history.dto';
import { UpdateSellsHistoryDto } from './dto/update-sells-history.dto';

@Controller('sells-history')
export class SellsHistoryController {
  constructor(private readonly sellsHistoryService: SellsHistoryService) {}

  @Post()
  create(@Body() createSellsHistoryDto: CreateSellsHistoryDto) {
    return this.sellsHistoryService.create(createSellsHistoryDto);
  }

  @Get()
  findAll() {
    return this.sellsHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellsHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSellsHistoryDto: UpdateSellsHistoryDto,
  ) {
    return this.sellsHistoryService.update(+id, updateSellsHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellsHistoryService.remove(+id);
  }
}
