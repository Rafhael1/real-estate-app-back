import { Request, Response } from 'express'

import Property from '../../models/property'
import User from '../../models/user'

export const getProperties = async (req: Request, res: Response) => {
	const properties = await Property.find({}).limit(25)

	res.send(properties)

}

export const getPropertyById = async (req: Request, res: Response) => {
	const property = await Property.find({})

	res.send(property)
}

export const createProperty = async(req: Request, res: Response) => {
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

	res.send('Uploaded sucessfully')

}