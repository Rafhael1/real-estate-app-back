import * as mongoose from 'mongoose';

export const CountriesSchema = new mongoose.Schema({
	name: { type: String, required: false },
	cod: { type: String, required: false },
});
