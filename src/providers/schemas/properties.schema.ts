import * as mongoose from 'mongoose';

export const PropertiesSchema = new mongoose.Schema({
	title: { type: String, required: false },
	description: { type: String, required: false },
	bathrooms: { type: Number, required: false },
	bedrooms: { type: Number, required: false },
	squareMeter: { type: Number, required: false },
	address: { type: String, required: false },
	city: { type: String, required: false },
	country: { type: String, required: true },
	propertyType: { type: String, required: false, default: 'Residential' }, // Residential || Commercial
	price: { type: Number, required: false },
	status: { type: String, required: false },
	images: { type: [String], required: false },
	user: {
		id: { type: String, required: true },
		email: { type: String, required: true },
		name: { type: String, required: false },
	},
	postDate: {
		type: Date,
		default: Date.now,
	},
	views: { type: Number, required: false, default: 0 },
	isPostActive: { type: Boolean, default: true },
});
