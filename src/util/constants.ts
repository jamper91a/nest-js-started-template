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
  tokens: {
    sAdmin:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiU0FkbWluIiwidXNlcm5hbWUiOiJzdXBlckFkbWluIiwicGFzc3dvcmQiOm51bGwsInVzZXJuYW1lX3JmZGkiOiIgIiwicGFzc3dvcmRfcmZkaSI6bnVsbCwiYWN0aXZlIjp0cnVlLCJncm91cElkIjoxLCJjcmVhdGVkQXQiOiIyMDE4LTA4LTEwVDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTA3VDIxOjE2OjQzLjAwMFoifSwiaWF0IjoxNjM2MzIwNTk5LCJleHAiOjE2NDE1MDQ1OTl9.OCPHdS8decqGr6JLHIyZQVVv_WnjG4n8VyOCGtJI3iw',
    admin:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJuYW1lIjoiR2VyZW50ZSBJbnYgUmVhbCIsInVzZXJuYW1lIjoiZ2VyZW50ZUBpci5jb20iLCJwYXNzd29yZCI6bnVsbCwidXNlcm5hbWVfcmZkaSI6bnVsbCwicGFzc3dvcmRfcmZkaSI6bnVsbCwiYWN0aXZlIjp0cnVlLCJncm91cElkIjoyLCJjcmVhdGVkQXQiOiIyMDE4LTA4LTEwVDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA4LTEwVDAwOjAwOjAwLjAwMFoifSwiaWF0IjoxNjM2MzIwNjIwLCJleHAiOjE2NDE1MDQ2MjB9.DI5_uevFINn6NqyPp4fptJgJ43c6YHA9L8M-ZK565Ms',
    cashier:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiQ2FqZXJvIEludiBSZWFsIiwidXNlcm5hbWUiOiJjYWplcm9AaXIuY29tIiwicGFzc3dvcmQiOm51bGwsInVzZXJuYW1lX3JmZGkiOm51bGwsInBhc3N3b3JkX3JmZGkiOm51bGwsImFjdGl2ZSI6dHJ1ZSwiZ3JvdXBJZCI6MywiY3JlYXRlZEF0IjoiMjAxOS0xMS0xNVQxNToyODo1My4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOS0xMS0xNVQxNToyODo1My4wMDBaIiwiZW1wbG95ZWUiOnsiaWQiOjEsImNvbXBhbnlJZCI6MSwidXNlcklkIjozLCJzaG9wSWQiOjEsImNyZWF0ZWRBdCI6IjIwMTktMTEtMTFUMDA6MDA6MDAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTktMTEtMTFUMDA6MDA6MDAuMDAwWiJ9fSwiaWF0IjoxNjM2MzIwNjc3LCJleHAiOjE2NDE1MDQ2Nzd9.k4J9J0i0yUmORoU7D-wSW4d-uQ8BcawjDln4bwhnXmg',
    warehouse: '',
    dealer:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJuYW1lIjoiRGVhbGVyIEludiBSZWFsIiwidXNlcm5hbWUiOiJkZWFsZXJAaXIuY29tIiwicGFzc3dvcmQiOm51bGwsInVzZXJuYW1lX3JmZGkiOm51bGwsInBhc3N3b3JkX3JmZGkiOm51bGwsImFjdGl2ZSI6dHJ1ZSwiZ3JvdXBJZCI6NSwiY3JlYXRlZEF0IjoiMjAxOS0xMS0xNVQxNToyODo1My4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOS0xMS0xNVQxNToyODo1My4wMDBaIiwiZGVhbGVyIjp7ImlkIjoxLCJuYW1lIjoiSW52ZW50YXJpbyBSZWFsIiwidXNlcklkIjo0LCJjcmVhdGVkQXQiOiIyMDE5LTExLTExVDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTExLTExVDAwOjAwOjAwLjAwMFoifX0sImlhdCI6MTYzNjMyMDcwMiwiZXhwIjoxNjQxNTA0NzAyfQ.fmeodOcCxNUAqhX1-iH1hoB4UgywjKZPdhDg1voRmZA',
    companyAdmin:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJuYW1lIjoiR2VyZW50ZSBDYWxsZSA4MCIsInVzZXJuYW1lIjoiZ2VyZW50ZTgwQGlyLmNvbSIsInBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZV9yZmRpIjpudWxsLCJwYXNzd29yZF9yZmRpIjpudWxsLCJhY3RpdmUiOnRydWUsImdyb3VwSWQiOjYsImNyZWF0ZWRBdCI6IjIwMTktMTEtMTVUMTU6Mjg6NTMuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTktMTEtMTVUMTU6Mjg6NTMuMDAwWiJ9LCJpYXQiOjE2MzYzMjA3MjIsImV4cCI6MTY0MTUwNDcyMn0.WqybXYM3pbXu9qw1xdhG0hQcahT4vTyQadt07lKMs-U',
  },
};
