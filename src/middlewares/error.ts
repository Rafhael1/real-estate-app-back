import { Request, Response, NextFunction } from 'express';


export const errorSetup = (req: Request, res:Response, next: NextFunction) => {
	const err = new Error('Not Found');
	// @ts-ignore
	err.status = 400;
	next(err);
};

// @ts-ignore
export const error = (err, req: Request, res:Response, next: NextFunction) => {
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: 'Something went wrong!'
		}
	});
};
