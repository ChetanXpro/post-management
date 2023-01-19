import { set, connect } from 'mongoose'

// import { info, error as _error } from "./logger";

// const logger = require("./logger");

const connectDB = async () => {
	try {
		set('strictQuery', false)
		const ccc = connect(
			'mongodb+srv://chetan:chetan@cluster0.tr5f1lc.mongodb.net/duWebDB?retryWrites=true&w=majority',

			() => {
				console.log('Database connected')
			}
		)
	} catch (error) {
		console.error(error)
	}
}

export default connectDB
