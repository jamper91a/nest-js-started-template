import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserAuthEntity } from '../auth/entities/user-auth';

export interface CurrentUserOptions {
  required?: boolean;
}

export const UserAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserAuthEntity => {
    const request = ctx.switchToHttp().getRequest();
    //Todo set proper property
    return request.user;
  },
);
