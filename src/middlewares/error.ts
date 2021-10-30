import { Request, Response, NextFunction } from 'express'


export const errorSetup = (req: Request, res:Response, next: NextFunction) => {
	const err = new Error('Not Found')
	// @ts-ignore
	err.status = 400
	next(err)
}

// @ts-ignore
export const errorHandler = (err, req: Request, res:Response) => {
	res.status(err.status || 500)
	res.send({
		error: {
			status: err.status || 500,
			message: err.message
		}
	})
}
