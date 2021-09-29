/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { Request, Response } from "express"
const router = express.Router()

import multer from "multer"

// Schemas

import Property from "../models/property"
import User from "../models/user"

// Verification middleware

import verify from "../middlewares/verifyToken"

// Image Storage

const storage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		// If it goes wrong just change it back to ../upload/
		cb(null, "../upload/")
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

router.get("/properties", verify, async (req: Request, res: Response) => {
	
	const data = await Property.find({}).limit(1)
	
	

	res.send(data)


})

router.post("/create-real-estate", verify, upload.array("images"), async(req: Request, res: Response) => {
	try {
		const filePath: any = req.files
		// const data = JSON.parse(req.body.data)
		const {
			title,
			description,
			squareMeter,
			bathrooms,
			bedrooms,
			address,
			country,
			price,
			status,
		} = JSON.parse(req.body.data)
		
		// @ts-ignore
		const userId = req.user
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		const userData = await User.findOne({ _id: userId.__id })
		console.log(userData)
		console.log(userId)

		// eslint-disable-next-line prefer-const
		let imagePaths: string[] = []

		for(let i = 0; i < filePath.length; i++ ){
			imagePaths.push(filePath[i].path)
		}

		// console.log(imagePaths)
	
		const record = {
			title: title,
			description: description,
			squareMeter: squareMeter,
			bathrooms: bathrooms,
			bedrooms: bedrooms,
			address: address,
			country: country, 
			price: price,
			status: status,
			images: imagePaths,
			user: {
				id: userData._id,
				name: userData.name,
				email: userData.email,
			},
		} 

		Property.create(record)

		res.send("Uploaded sucessfully")

	} catch (error) {
		console.log(error)
	}
})

export default router

