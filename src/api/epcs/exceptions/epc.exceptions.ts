import { BadRequestException } from '@nestjs/common';

export class EpcExceptions {
  companyNoValid() {
    throw new BadRequestException(null, 'Company no valid');
  }

  validationError(e) {
    console.error(e.name);
    if (e.name === 'SequelizeUniqueConstraintError') {
      const errors = e.errors;
      for (const error of e.errors) {
        let message = '';
        switch (error.validatorKey) {
          case 'not_unique':
            message =
              error.value + ' epc code already used. Please use another one';
            break;
        }
        return new BadRequestException(null, message);
      }
    } else {
      return e;
    }
  }
}
