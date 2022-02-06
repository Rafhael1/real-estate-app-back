/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt_decode from 'jwt-decode';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userToken = req.headers.authtoken;

    if (userToken) {
      // @ts-ignore
      const decodedUser = jwt_decode(userToken);

      // @ts-ignore
      req.user = decodedUser.__id;

      req.body = {
        ...req.body,
        // @ts-ignore
        userId: decodedUser.__id,
      };
    }

    next();
  }
}
