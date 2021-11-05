import { Router } from 'express'
const router = Router()

import verify from '../../middlewares/verifyToken'
import { upload } from '../../middlewares/multerConfig'

import {
	getProperties,
	createProperty,
	getPropertyById
} from './properties.controller'

router.get('/properties', getProperties)

router.get('/properties/:id', getPropertyById)

router.post('/create-real-estate', verify, upload.array('images'), createProperty)


export default router
