import { BadRequestException } from '@nestjs/common';

export class ProductsZonesExceptions {
  productsNoReturned() {
    throw new BadRequestException(null, 'Products were not returned');
  }

  historyNoCreated() {
    throw new BadRequestException(null, 'Return history was not created');
  }

  epcNoFound(err) {
    throw new BadRequestException(
      err,
      'Epc no found while trying to add products zone',
    );
  }

  productsZoneNoCreated(err) {
    console.log(err);
    throw new BadRequestException(err, 'Products zone could not be create');
  }

  epcAlreadyUse(err) {
    console.log(err);
    throw new BadRequestException(err, 'Epc already used');
  }

  productNoFound(err) {
    throw new BadRequestException(err, 'Product was not found');
  }
}
