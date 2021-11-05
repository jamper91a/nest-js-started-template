import { Constants } from '../../../util/constants';

export class ReportTypeEntity {
  id: number;
  name: string;
}

export const reportTypes: ReportTypeEntity[] = [
  { id: 1, name: Constants.reports.type.DIFFERENCE_PHYSICAL_UNITS },
  { id: 2, name: Constants.reports.type.SOLD_UNITS },
];

export const reportTypesId = {
  DIFFERENCE_PHYSICAL_UNITS: 1,
  SOLD_UNITS: 2,
};
