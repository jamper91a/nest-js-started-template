import { Zone } from '../../zones/entities/zone.entity';

export class NewInventoryResponseDto {
  date: Date;
  partial: boolean;
  collaborative: boolean;
  message: string;
  zoneId: number;
  zone: Zone;
}
