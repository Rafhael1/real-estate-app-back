import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
	title: { type: String, required: false, },
	description: { type: String, required: false, },
	bathrooms: { type: Number, required: false, },
	bedrooms: { type: Number, required: false, },
	squareMeter: { type: Number, required: false },
	adress: { type: String, required: false, },
	propertyType: { type: String, required: false, default:  'Residencial' },
	country: { type: String, required: false, },
	price: { type: String, required: false, },
	status: { type: String, required: false, },
	images: { type: [String], required: true, },
	user: {
		id: { type:  String, required: true },
		email: { type: String, required: true },
		name: { type: String, required: false },
		phone: { type: String, required: false }
	},
	postDate: {
		type: Date,
		default: Date.now
	},
	views: { type: Number, required: false, default: 0  }
});

// Status: For sale, rent, under construction, Sold out

const model = mongoose.model('Property', PropertySchema);

export default model;