import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 4,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});
