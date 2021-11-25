import { BadRequestException } from '@nestjs/common';

export class ProductExceptions {
  photoNoSaved() {
    throw new BadRequestException(null, 'Photo could not be uploaded');
  }

  productNoCreated() {
    throw new BadRequestException(null, 'Product could not be create');
  }

  productNoUpdated() {
    throw new BadRequestException(null, 'Product could not be update');
  }

  productNoFound() {
    throw new BadRequestException(null, 'Product could not be found');
  }
}
