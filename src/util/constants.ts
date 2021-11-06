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
  report: {
    type: {
      DIFFERENCE_PHYSICAL_UNITS: 'DIFFERENCE_PHYSICAL_UNITS',
      SOLD_UNITS: 'SOLD_UNITS',
    },
  },
  return: {
    type: {
      CLIENT: 'CLIENT',
      SUPPLIER: 'SUPPLIER',
    },
  },
  transfersProductsZone: {
    states: {
      NOT_RECEIVED: 'NOT_RECEIVED',
      RECEIVED: 'RECEIVED',
    },
  },
};
