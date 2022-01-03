import { Controller } from '@nestjs/common';
import { TransfersProductsZonesService } from './transfers-products-zones.service';

@Controller('transfers-products-zones')
export class TransfersProductsZonesController {
  constructor(
    private readonly transfersProductsZonesService: TransfersProductsZonesService,
  ) {}
}
