import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenAuthEntity } from '../auth/entities/user-auth';

export interface CurrentUserOptions {
  required?: boolean;
}

export const UserAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenAuthEntity => {
    const request = ctx.switchToHttp().getRequest();
    //Todo set proper property
    return request.user;
  },
);
