/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt_decode from 'jwt-decode';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const userToken = req.headers.authorization.replace('Bearer ', '');

      if (userToken && userToken.length > 10) {
        // @ts-ignore
        const decodedUser = jwt_decode(userToken).__id;

        // @ts-ignore
        req.user = decodedUser;

        req.body = {
          ...req.body,
          userId: decodedUser,
        };
      }
    }
    next();
  }
}
