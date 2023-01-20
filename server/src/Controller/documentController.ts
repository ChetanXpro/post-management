import Documents from '../Models/Documents'
import asyncHandler from 'express-async-handler'
import { json } from 'stream/consumers'
import crypto from 'crypto'

export const createDocuments = asyncHandler(async (req: any, res: any) => {
	const { title, description } = req.body

	if (!title || !description) return res.status(400).json({ message: 'Provide all inputs' })
	const id = crypto.randomUUID()
	const doc = await Documents.create({
		documentId: id,
		version: 1,
		stage: 'Editing',
		title,
		createdBy: req.id,
		description,
	})

	console.log(doc)

	res.status(400).json({ message: `Document created in editing stage ${title}` })
})

export const submitForReview = asyncHandler(async (req, res) => {
	const { documentId } = req.body

	

	await Documents.updateOne({ documentId }, { stage: 'Pending approval' })
})
