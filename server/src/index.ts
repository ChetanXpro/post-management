import dotenv from 'dotenv'
dotenv.config()
import express, { json } from 'express'
import connectDB from './config/db'
import errorHandler from './Middleware/errorHandler'

const app = express()

const PORT = process.env.PORT || 3003
app.use(errorHandler)
app.use(json())

import Documents from './Routes/docRoutes'
import User from './Routes/userRoutes'

app.use('/doc', Documents)
app.use('/user', User)

connectDB()
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
