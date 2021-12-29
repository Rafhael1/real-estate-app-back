import { Router } from 'express'
import verify from '../../middlewares/verifyToken'
import { upload } from '../../middlewares/multerConfig'
import {
	getAllUserPosts,
	createProperty,
	editPostById,
	deletePostById
} from './dashboard.controller'

const router = Router()

router.get('/all-user-posts', verify, getAllUserPosts )

router.post('/create-real-estate', verify, upload.array('images'), createProperty)

router.put('/edit-user-post/:postId', verify, editPostById )

router.delete('/delete-user-post/:postId', verify, deletePostById )

export default router