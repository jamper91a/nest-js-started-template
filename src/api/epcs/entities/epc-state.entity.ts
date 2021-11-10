import { Constants } from '../../../util/constants';

export class EpcStateEntity {
  id: number;
  name: string;
}

export enum EpcStates {
  NOT_ASSIGNED,
  ASSIGNED,
  USED,
  SOLD,
  MISSING,
}

export const epcStates: EpcStateEntity[] = [
  { id: 0, name: Constants.epc.states.NOT_ASSIGNED },
  { id: 1, name: Constants.epc.states.ASSIGNED },
  { id: 2, name: Constants.epc.states.USED },
  { id: 3, name: Constants.epc.states.SOLD },
  { id: 4, name: Constants.epc.states.MISSING },
];
