import { Router } from 'express';
const router = Router();

import {
	getProperties,
	getPropertyById
} from './properties.controller';

router.get('/properties', getProperties);

router.get('/properties/:id', getPropertyById);


export default router;
