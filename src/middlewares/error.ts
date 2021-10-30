import { Request, Response, NextFunction } from "express"

export const error = ( req: Request, res:Response, next: NextFunction) => {
	console.log("Pizzaria", req.query)
	next()
}