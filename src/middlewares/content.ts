// @ts-ignore
import { name, version } from '../../package.json'
import { Request, Response, NextFunction } from 'express'

export const content = ( req: Request, res: Response, next: NextFunction) => {

	const response = res.json
	// @ts-ignore
	res.json = (obj) => {
		obj = {
			meta: {
				api: name,
				apiVersion: version,
				page: 1,
				totalPages: 2,
				totalResults: 200,
				limit: 15,
				count: 15
			},
			records: obj
		}
		obj.meta.totalPages = Math.floor(obj.meta.totalResults / obj.meta.limit)
		response.call(res, obj)
	}

	next()
}