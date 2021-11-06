import { Constants } from '../../../util/constants';

export class TransfersProductsZoneStateEntity {
  id: boolean;
  name: string;
}

export const transfersProductsZoneState: TransfersProductsZoneStateEntity[] = [
  { id: false, name: Constants.transfersProductsZones.states.NOT_RECEIVED },
  { id: true, name: Constants.transfersProductsZones.states.RECEIVED },
];

export const transfersProductsZoneStateId = {
  NOT_RECEIVED: false,
  RECEIVED: true,
};
