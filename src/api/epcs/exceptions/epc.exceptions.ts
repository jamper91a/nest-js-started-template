import { BadRequestException } from '@nestjs/common';

export class EpcExceptions {
  companyNoValid() {
    throw new BadRequestException(null, 'Company no valid');
  }

  epcNotFound() {
    throw new BadRequestException(null, 'Epc not found');
  }

  epcCodeAlreadyUsed(epc: string) {
    return new BadRequestException(
      null,
      ` ${epc} code already used. Please use another one`,
    );
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
        return this.epcCodeAlreadyUsed(error.value);
      }
    } else {
      return e;
    }
  }
}
