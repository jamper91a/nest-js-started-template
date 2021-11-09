import { IsString } from 'class-validator';

export class LoginUserDto {
  /**
   * Email of the user
   * @example gerente@ir.com
   * */
  @IsString()
  // @IsEmail()
  username: string;
  /**
   * Password
   * @example 12345
   */
  @IsString()
  password: string;
}
