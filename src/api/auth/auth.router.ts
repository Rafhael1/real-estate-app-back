import { Router } from "express"
import { body } from "express-validator"
import verify from "../../middlewares/verifyToken"

import {
	registerController,
	loginController,
	verifyUserController
} from "./auth.controller"

const router = Router()

router.post("/register", 
	body("email").isEmail(), 
	body("password").isLength({ min: 6 }),
	registerController
)

router.post("/login", loginController)

router.post("/verify-user", verify, verifyUserController)

export default router