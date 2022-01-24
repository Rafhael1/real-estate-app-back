import { Router } from 'express';

import {
	autoCompleteLocationsController
} from './public.controller';

const router = Router();

router.get('/auto-complete-locations', autoCompleteLocationsController);

export default router;