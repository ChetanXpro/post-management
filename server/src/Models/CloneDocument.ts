import mongoose, { Schema, model, SchemaType } from 'mongoose'

const schema = new Schema({
	cloneDocumentId: { type: String, index: true },
	parentDocumentId: { type: String, index: true },
	version: { type: Number, index: true },
	stage: { type: String, require: true },
	title: { type: String, require: true },
	description: { type: String },
	cloneBy: { type: Schema.Types.ObjectId, ref: 'tryUser' },
})

export default model('cloneDocuments', schema)
