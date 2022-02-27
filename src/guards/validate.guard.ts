import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userToken: string = request.headers.authtoken;

    const verify = this.jwtService.verify(userToken);

    if (!verify) {
      // throw new expectption
    }

    return true;
  }
}
