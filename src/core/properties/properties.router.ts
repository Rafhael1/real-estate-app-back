import { Router, Request } from 'express'
const router = Router()
import multer from 'multer'

import verify from '../../middlewares/verifyToken'

import {
	getPropertiesController,
	createPropertyController
} from './properties.controller'

const storage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		// If it goes wrong just change it back to ../upload/
		cb(null, `${__dirname}/../../../upload`)
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname)
	}
})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 10
	}
})

router.get('/properties', getPropertiesController)

router.post('/create-real-estate', verify, upload.array('images'), createPropertyController)

export default router
