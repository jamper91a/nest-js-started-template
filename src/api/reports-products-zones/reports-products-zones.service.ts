import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReportsProductsZone } from './entities/reports-products-zone.entity';
import { HomologueUnitsDto } from '../reports/dto/homologue-units.dto';
import _ from 'underscore';

@Injectable()
export class ReportsProductsZonesService {
  private readonly logger = new Logger(ReportsProductsZonesService.name);

  constructor(
    @InjectModel(ReportsProductsZone)
    private reportsProductsZoneModel: typeof ReportsProductsZone,
  ) {}

  async homologueUnits(dto: HomologueUnitsDto, employeeId: number) {
    try {
      await this.reportsProductsZoneModel.update(
        {
          homologatorEmployeeId: employeeId,
        },
        {
          where: {
            productsZoneId: _.map(dto.products, 'id'),
          },
        },
      );
      return {};
    } catch (e) {
      this.logger.error('Units could not be homologue', e);
    }
  }
}
