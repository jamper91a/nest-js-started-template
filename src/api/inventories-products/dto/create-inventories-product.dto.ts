import { ApiHideProperty } from '@nestjs/swagger';

export class CreateInventoriesProductDto {
  @ApiHideProperty()
  inventoryId: number;
  zoneId: number;
  productsZoneId: number;
  epcId: number;
}
