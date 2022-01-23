import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verify = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authtoken as string;
	if(!token) {
		return res.status(500).send('Access Denied');
	}
	try {
		const verified = jwt.verify(token, process.env.TOKEN!);

		// @ts-ignore
		req.user = verified;

		next();
		
	} catch (error) {
		res.status(400).send('Invalid Token');
	}
};

export default verify;