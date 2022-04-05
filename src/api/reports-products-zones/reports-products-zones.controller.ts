import { Controller } from '@nestjs/common';
import { ReportsProductsZonesService } from './reports-products-zones.service';

@Controller('reports-products-zones')
export class ReportsProductsZonesController {
  constructor(
    private readonly reportsProductsZonesService: ReportsProductsZonesService,
  ) {}
}
