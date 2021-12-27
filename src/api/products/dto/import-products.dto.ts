import { IsNumber, Min, ValidateNested } from 'class-validator';
import { IsBiggerThan } from '../../../decorator/is-bigger-than.decorator';
import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class NewImportProduct {
  ean: string;
  plu: string;
  plu2?: string;
  plu3?: string;
  branch?: string;
  gender?: string;
  color?: string;
  size?: string;
  category?: string;
  description?: string;
  @ApiHideProperty()
  supplierId?: string;
  supplier?: string;

  @IsNumber()
  @Min(1, {
    message: 'Amount must be higher than 1',
  })
  amount: number;

  @IsNumber()
  @Min(1, {
    message: 'Cost price must be higher than 1',
  })
  costPrice: number;

  @IsNumber()
  @Min(1, {
    message: 'Sell price must be higher than 1',
  })
  @IsBiggerThan('costPrice', {
    message: 'Sell price must be higher than cost price',
  })
  sellPrice: number;

  @ApiHideProperty()
  companyId?: number;
}

export class ImportProductsDto {
  @ValidateNested({ each: true })
  @Type(() => NewImportProduct)
  products: NewImportProduct[];
}
