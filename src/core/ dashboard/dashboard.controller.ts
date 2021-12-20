import { Request, Response } from 'express'

import Property from '../../models/property'
import User from '../../models/property'

export const getAllUserPosts = async(req: Request, res: Response) => {
	// @ts-expect-error
	const userId: string = req.user.__id
    
	const properties = await Property.find({ 'user.id': userId })
	console.log(properties)

	res.send(properties)
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
	const userId = req.user.__id
	const userData = await User.findOne({ _id: userId })

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

export const deletePostById = async(req: Request, res: Response) => {
	const propertyId: string = req.params.postId
	
	await Property.findByIdAndDelete(propertyId)
	
	res.send('Post deleted')
}
