/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt_decode from 'jwt-decode';
import { Request, Response, NextFunction } from 'express';

interface ReqUser extends Request {
  user: {
    page: number;
    pageSize: number;
    offset: number;
  };
}
@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: ReqUser, res: Response, next: NextFunction) {
    const userToken = req.headers.authtoken;

    // @ts-ignore
    const decodedUser = jwt_decode(userToken);

    console.log(decodedUser);
    next();
  }
}
