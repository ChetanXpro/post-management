import mongoose, { Schema, model, SchemaType } from 'mongoose'

const schema = new Schema({
	documentId: { type: String, index: true },
	version: { type: Number, index: true },
	stage: { type: String, require: true },
	title: { type: String, require: true },
	discription: { type: String },
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

export default model('tryUser', schema)
