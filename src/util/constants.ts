export const Constants = {
  auth: {
    jwt: {
      secret: 'secret',
    },
  },
  epc: {
    states: {
      NOT_ASSIGNED: 'NOT_ASSIGNED',
      ASSIGNED: 'ASSIGNED',
      USED: 'USED',
      SOLD: 'SOLD',
      MISSING: 'MISSING',
    },
  },
  reports: {
    type: {
      DIFFERENCE_PHYSICAL_UNITS: 'DIFFERENCE_PHYSICAL_UNITS',
      SOLD_UNITS: 'SOLD_UNITS',
    },
  },
};
