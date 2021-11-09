import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateDealerDto {
  user: CreateUserDto;
  name: string;
}
