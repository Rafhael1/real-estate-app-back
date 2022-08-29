import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface ReqPagination extends Request {
	pagination: {
		page: number;
		pageSize: number;
		offset: number;
	};
}
@Injectable()
export class PaginationMiddleware implements NestMiddleware {
	use(req: ReqPagination, res: Response, next: NextFunction) {
		const pagination = {
			page: +req.query.page - 1 || 0,
			pageSize: +req.query.pageSize || 20,
			offset: +req.query.page * +req.query.pageSize,
		};
		pagination.offset = pagination.page * pagination.pageSize;
		req.pagination = pagination;
		next();
	}
}
