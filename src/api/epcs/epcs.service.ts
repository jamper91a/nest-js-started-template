import { Injectable } from '@nestjs/common';
import { CreateEpcDto } from './dto/create-epc.dto';
import { UpdateEpcDto } from './dto/update-epc.dto';

@Injectable()
export class EpcsService {
  create(createEpcDto: CreateEpcDto) {
    return 'This action adds a new epc';
  }

  findAll() {
    return `This action returns all epcs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} epc`;
  }

  update(id: number, updateEpcDto: UpdateEpcDto) {
    return `This action updates a #${id} epc`;
  }

  remove(id: number) {
    return `This action removes a #${id} epc`;
  }
}
