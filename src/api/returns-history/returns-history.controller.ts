import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReturnsHistoryService } from './returns-history.service';
import { CreateReturnsHistoryDto } from './dto/create-returns-history.dto';
import { UpdateReturnsHistoryDto } from './dto/update-returns-history.dto';

@Controller('returns-history')
export class ReturnsHistoryController {
  constructor(private readonly returnsHistoryService: ReturnsHistoryService) {}

  @Post()
  create(@Body() createReturnsHistoryDto: CreateReturnsHistoryDto) {
    return this.returnsHistoryService.create(createReturnsHistoryDto);
  }

  @Get()
  findAll() {
    return this.returnsHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnsHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReturnsHistoryDto: UpdateReturnsHistoryDto,
  ) {
    return this.returnsHistoryService.update(+id, updateReturnsHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnsHistoryService.remove(+id);
  }
}
