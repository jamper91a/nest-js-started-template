import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  /**
   * Email of the user
   * @example email@email.com
   * */
  @IsString()
  username: string;
  /**
   * Password
   * @example 12345
   */
  @IsString()
  password: string;
}
