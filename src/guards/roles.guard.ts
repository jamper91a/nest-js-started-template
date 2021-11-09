/**
 * https://docs.nestjs.com/guards#role-based-authentication
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenAuthEntity } from '../auth/entities/user-auth';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: TokenAuthEntity = request.user;
    //TODO Change user.roles for the real property
    return this.matchRoles(roles, user.user.groupId);
  }

  private matchRoles(roles: number[], userRole: number) {
    for (const role of roles) {
      if (role === userRole) {
        return true;
      }
    }
    throw new UnauthorizedException('Role no valid');
  }
}
