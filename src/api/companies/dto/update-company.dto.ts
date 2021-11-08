import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  logo?: any;
  name?: string;
  @ApiHideProperty()
  photo?: string = null;
}
