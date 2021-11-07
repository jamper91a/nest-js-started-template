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

@ApiTags('Dealers')
@Controller('dealers')
export class DealersController {
  constructor(private readonly dealersService: DealersService) {}

  @Post()
  create(@Body() createDealerDto: CreateDealerDto) {
    return this.dealersService.create(createDealerDto);
  }

  // @Post('get-companies')
  // getCompanies(@UserAuth() user : UserAuthEntity){
  //
  // }

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
