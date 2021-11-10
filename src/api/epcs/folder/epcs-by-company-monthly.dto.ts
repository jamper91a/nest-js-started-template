enum MonthName {
  Januany = 'Januany',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  Jule = 'Jule',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

export class EpcsByCompanyMonthlyDto {
  /**
   * @example 20
   */
  amount: number;
  /**
   * @example 10
   */
  day: number;
  /**
   * example August
   */
  month: MonthName;
}
