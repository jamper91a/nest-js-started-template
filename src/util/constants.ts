export const Constants = {
  auth: {
    jwt: {
      secret: 'k{B^um3fzwP-68cN',
    },
  },
  groups: {
    superAdmin: 1,
    admin: 2,
    cashier: 3,
    warehouse: 4,
    dealer: 5,
    companyAdmin: 6,
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
