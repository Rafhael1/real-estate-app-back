import { Request, Response } from "express"

import Property from "../../models/property"
import User from "../../models/user"


export const getPropertiesController = async (req: Request, res: Response) => {
	const data = await Property.find({}).limit(10)

	res.send(data)

}

export const createPropertyController = async(req: Request, res: Response) => {
	try {
		const filePath: any = req.files
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
		const userData = await User.findOne({ _id: userId.__id })

		const imagePaths: string[] = []

		// convert into forEach
		for(let i = 0; i < filePath.length; i++ ){
			imagePaths.push(filePath[i].path)
		}
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
}