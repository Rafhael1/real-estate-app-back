// @ts-ignore
import { name, version } from '../../package.json';
import { Request, Response, NextFunction } from 'express';

export const content = ( req: Request, res: Response, next: NextFunction) => {
	const response = res.json;

	// @ts-expect-error
	const page: number = parseInt(req.query.page);
	// @ts-expect-error
	const limit: number = parseInt(req.query.limit);
	// @ts-ignore
	res.json = (obj) => {
		obj = {
			meta: {
				api: name,
				apiVersion: version,
				page: page || 1,
				totalResults: obj.totalResults || 200,
				limit: limit || 25,
				count: obj.length || 0,
				offset: page * limit - limit
			},
			records: obj
		};
		obj.meta.totalPages = Math.floor(obj.meta.totalResults / obj.meta.limit);
		response.call(res, obj);
	};

	next();
};