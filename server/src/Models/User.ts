import { Schema, model } from 'mongoose'

const schema = new Schema(
	{
		email: {
			type: String,

			require: true,
		},
		password: {
			type: String,

			require: true,
		},
		roles: {
			type: String,
			enum: ['Creator', 'Admin', 'Public'],
			default: 'Public',
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
)

export default model('tryUser', schema)
