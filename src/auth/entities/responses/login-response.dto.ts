import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../api/users/entities/user.entitity';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'JIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhvc3QxQGVtYWlsLmNvbSIsInN1YiI6eyJpZCI6MSwibmFtZSI6Ikhvc3QgMSB1cGRhdGVkIiwiZW1haWwiOiJob3N0MUBlbWFpbC5jb20iLCJncm91cElkIjozLCJjb3VudHJ5SWQiOjEsImhvc3QiOnsiaWQiOjEsImFwcHJvdmVkIjoxLCJiYW5uZWQiOjB9LCJzcGVjdGF0b3IiOm51bGx9LCJpYXQiOjE2MTQ1MDM3NjQsImV4cCI6MTYxNDUwMzgyNH0.TgX9a4OXPb6eF-K_bb1u1mD-U3KJyeNChkEit_AedLQ',
  })
  access_token: string;
  user: User;
}
