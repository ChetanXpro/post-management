import mongoose, { Schema, model } from 'mongoose'

const schema = new Schema({
	documentId: { type: String, index: true },
	version: { type: Number, index: true },
	title: { type: String },
	discription: { type: String },
})

export default model('Documents', schema)
