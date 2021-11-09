import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
  name: string;
  username: string;
  password: string;
  @ApiHideProperty()
  groupId: number;
  @ApiHideProperty()
  active: boolean;
}
