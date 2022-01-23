import { Request, Response } from 'express';

import Property from '../../models/property';
import User from '../../models/user';

export const getProperties = async (req: Request, res: Response) => {
	const properties = await Property.find({}).limit(25);

	res.send(properties);

};

export const getPropertyById = async (req: Request, res: Response) => {
	const property = await Property.find({});

	res.send(property);
};