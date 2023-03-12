import { set, connect } from 'mongoose'

// import { info, error as _error } from "./logger";

// const logger = require("./logger");

const connectDB = async () => {
	try {
		set('strictQuery', false)
		const ccc = connect(
			process.env.DB_URI || '',

			() => {
				console.log('Database connected')
			}
		)
	} catch (error) {
		console.error(error)
	}
}

export default connectDB
