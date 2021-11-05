import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EpcsService } from './epcs.service';
import { CreateEpcDto } from './dto/create-epc.dto';
import { UpdateEpcDto } from './dto/update-epc.dto';

@Controller('epcs')
export class EpcsController {
  constructor(private readonly epcsService: EpcsService) {}

  @Post()
  create(@Body() createEpcDto: CreateEpcDto) {
    return this.epcsService.create(createEpcDto);
  }

  @Get()
  findAll() {
    return this.epcsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.epcsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpcDto: UpdateEpcDto) {
    return this.epcsService.update(+id, updateEpcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epcsService.remove(+id);
  }
}
