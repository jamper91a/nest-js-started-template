import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  /**
   * Seach an element in array and check if exist
   * @param arrayToSearch
   * @param objectToFind
   */
  exitsInArray(arrayToSearch: any[], objectToFind: any): boolean {
    const found = arrayToSearch.find((value) => value.id === objectToFind.id);
    return found;
  }
}
