import { Constants } from '../../../util/constants';

export class ReturnTypeEntity {
  id: number;
  name: string;
}

export const returnTypes: ReturnTypeEntity[] = [
  { id: 1, name: Constants.return.type.CLIENT },
  { id: 2, name: Constants.return.type.SUPPLIER },
];

export const returnTypesId = {
  CLIENT: 1,
  SUPPLIER: 2,
};
