import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeesInventoriesService } from './employees-inventories.service';
import { CreateEmployeesInventoryDto } from './dto/create-employees-inventory.dto';
import { UpdateEmployeesInventoryDto } from './dto/update-employees-inventory.dto';

@Controller('employees-inventories')
export class EmployeesInventoriesController {
  constructor(
    private readonly employeesInventoriesService: EmployeesInventoriesService,
  ) {}

  @Post()
  create(@Body() createEmployeesInventoryDto: CreateEmployeesInventoryDto) {
    return this.employeesInventoriesService.create(createEmployeesInventoryDto);
  }

  @Get()
  findAll() {
    return this.employeesInventoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesInventoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeesInventoryDto: UpdateEmployeesInventoryDto,
  ) {
    return this.employeesInventoriesService.update(
      +id,
      updateEmployeesInventoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesInventoriesService.remove(+id);
  }
}
