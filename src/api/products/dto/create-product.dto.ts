import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
  supplierId: number;
  amount: number;
  costPrice: number;
  sellPrice: number;
  @ApiProperty({ type: 'string', format: 'binary' })
  photo?: any;
  @ApiHideProperty()
  image?: string;
  @ApiHideProperty()
  companyId?: number;
}
