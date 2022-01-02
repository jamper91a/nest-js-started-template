import { Employee } from '../../employees/entities/employee.entity';
import { IsDate, IsOptional } from 'class-validator';
import { IsOlderThan } from '../../../decorator/is-older-than.decorator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum ReturnType {
  CUSTOMER = '1',
  SUPPLIER = '2',
}

export class ReturnsByTypeDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    example: '2019-10-01',
  })
  firstDate: Date;
  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    example: '2022-10-01',
  })
  @IsOlderThan('firstDate', {
    message: 'Second date must be older than first date',
  })
  secondDate: Date;
  @Type(() => Number)
  type: ReturnType;
  @IsOptional()
  employee?: Employee;
}
