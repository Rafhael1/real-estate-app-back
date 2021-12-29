import { Request, Response } from 'express'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import verify from '../../middlewares/verifyToken'
import { validationResult } from 'express-validator'

import User from '../../models/user'

export const registerController = async (req: Request, res: Response) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).send('Invalid email address. Please try again.')
	}

	// Check if user already exists
	const userExist = await User.findOne({ email: req.body.email })

	if(userExist){
		return res.status(400).send('User already exists')
	}

	// Encrypt passwords

	const salt = await bcrypt.genSalt(10)

	const encryptedPassword = await bcrypt.hash(req.body.password, salt)

	// Create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: encryptedPassword 
	})
	const savedUser = await user.save()

	// Change this fucking res.send
	res.send(savedUser)
}

export const loginController = async (req: Request, res: Response) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).send('Invalid email address. Please try again.')
	}

	// Check if user exists
	const user = await User.findOne({ email: req.body.email })
	
	if(!user){
		return res.status(400).send('Email or password is wrong!')
	}

	// Check if password is correct
	const validPassword = await bcrypt.compare(req.body.password, user.password)

	if(!validPassword){
		return res.status(500).send('Email or password is wrong!')
	}

	// Create and assign a jwt token
	const token = jwt.sign({ __id: user.id }, process.env.TOKEN!)

	res.json({
		'authToken': token,
		'message': 'Logged In'
	})
}

export const verifyUserController = async(req: Request, res: Response) => {
	//@ts-ignore
	const userId = req.user
		
	await User.findOne({ _id: userId.__id })

	res.send(true)
}