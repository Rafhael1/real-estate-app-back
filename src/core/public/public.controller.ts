import { Request, Response } from 'express';
import { redisClient } from '../../config/redis';
import Geolocaitons from '../../models/geolocations';

export const autoCompleteLocationsController = async(req: Request, res: Response) => {
	redisClient.connect();
	const test = await Geolocaitons.find({ country: 'BR' });
	redisClient.setEx('locations', 2500, JSON.stringify(test));
	
	const a = await redisClient.get('locations');
	// console.log(redisClient.get('locations'));
	res.send(test);
};