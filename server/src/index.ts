import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './config/db'

const app = express()

const PORT = process.env.PORT || 3003

import Documents from './Models/Documents'
import User from './Models/User'
import mongoose from 'mongoose'

app.use('/api/doc', Documents)
app.use('/api/doc', User)

connectDB()
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
