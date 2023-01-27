import Documents from '../Models/Documents'

import asyncHandler from 'express-async-handler'
import { json } from 'stream/consumers'
import crypto from 'crypto'
import CloneDocument from '../Models/CloneDocument'

// Content creator Service
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

	res.status(200).json({ message: `Document created in Editing stage ${title}` })
})

export const submitForReview = asyncHandler(async (req: any, res: any) => {
	const { documentId } = req.body

	const { acknowledged } = await Documents.updateOne({ documentId }, { stage: 'Pending approval' })

	if (!acknowledged) return res.status(400).json({ message: 'Something went wrong' })

	res.status(200).json({ message: 'Your document is now in Pending stage' })
})

// Admin service

export const approveDocument = asyncHandler(async (req: any, res: any) => {
	const { documentId } = req.body
	const { acknowledged } = await Documents.updateOne({ documentId }, { stage: 'Approved' })

	if (!acknowledged) return res.status(400).json({ message: 'Something went wrong' })

	res.status(200).json({ message: 'Document is approved' })
})

export const rejectDocument = asyncHandler(async (req: any, res: any) => {
	const { documentId } = req.body
	const { acknowledged } = await Documents.updateOne({ documentId }, { stage: 'Rejected' })

	if (!acknowledged) return res.status(400).json({ message: 'Something went wrong' })

	res.status(200).json({ message: 'Document is Rejected' })
})

// Creating version 2 of

export const cloneDocument = asyncHandler(async (req: any, res: any) => {
	const { documentId } = req.body

	

	const foundDocument = await Documents.findOne({ documentId, archived: false })

	if (!foundDocument) return res.status(400).json({ message: 'No document found with this id' })

	const id = crypto.randomUUID()
	console.log(foundDocument)

	const obj = await CloneDocument.create({
		cloneDocumentId: id,
		parentDocumentId: foundDocument.documentId,
		title: foundDocument.title,
		parentTitle: foundDocument.title,
		parentDescription: foundDocument.description,
		stage: 'Editing',
		description: foundDocument.description,
		version: foundDocument.version,
		cloneBy: req.id,
	})

	if (obj) {
		return res.status(200).json({ message: `Document with ${documentId} cloned ` })
	}
})

// Clone documents services

export const submitCloneDocument = asyncHandler(async (req: any, res: any) => {
	const { cloneDocumentId } = req.body

	if (!cloneDocumentId) return res.status(400).json({ message: 'Provide all inputs' })

	const { acknowledged } = await CloneDocument.updateOne({ cloneDocumentId }, { stage: 'Pending approval' })

	if (!acknowledged) return res.status(400).json({ message: 'Something went wrong' })

	res.status(200).json({ message: 'Your clone document is now in Pending stage' })
})

// admin

export const createNewVersion = asyncHandler(async (req: any, res: any) => {
	const { cloneDocumentId } = req.body

	const foundClone = await CloneDocument.findOne({ cloneDocumentId })

	const foundDocument = await Documents.findOne({
		documentId: foundClone?.parentDocumentId,
		version: foundClone?.version,
	})
	console.log(foundDocument)
	foundDocument!.archived = true

	await foundDocument?.save()

	const version = foundDocument!.version! + 1

	const doc = await Documents.create({
		documentId: foundClone?.parentDocumentId,
		title: foundClone?.title,
		description: foundClone?.description,
		version: version,
		stage: 'Approved',
		archived: false,
		createdBy: foundClone?.cloneBy,
	})

	await foundClone?.delete()

	console.log(doc)
	res.status(200).json({ message: 'Clone Document is approved and new version created' })
})

export const rejectCloneDocument = asyncHandler(async (req: any, res: any) => {
	const { cloneDocumentId } = req.body
	const { acknowledged } = await CloneDocument.updateOne({ cloneDocumentId }, { stage: 'Rejected' })

	if (!acknowledged) return res.status(400).json({ message: 'Something went wrong' })

	res.status(200).json({ message: 'Clone Document is Rejected' })
})

// Get data

export const getAllPublicDoc = asyncHandler(async (req, res) => {
	const allApprovedDoc = await Documents.find({ stage: 'Approved', archived: false })

	res.status(200).json({ allApprovedDoc })
})

export const getPendingDocs = asyncHandler(async (req: any, res: any) => {
	const doc = await Documents.find({ createdBy: req.id, stage: 'Pending approval' })
	const cloneDoc = await CloneDocument.find({ cloneBy: req.id, stage: 'Pending approval' })
	const pendingDocs = [...doc, ...cloneDoc]

	res.status(200).json({ pendingDocs })
})

export const getEditingDocs = asyncHandler(async (req: any, res: any) => {
	const doc = await Documents.find({ createdBy: req.id, stage: 'Editing' })

	const editingDocs = [...doc]

	res.status(200).json({ editingDocs })
})

export const editCreatorDocs = asyncHandler(async (req: any, res: any) => {
	const payload = req.body

	const { title, description, documentId } = payload
	if (!title || !description || !documentId) return res.status(400).json({ message: 'Please provide all inputs' })

	const editied = await Documents.findOneAndUpdate(
		{ documentId, stage: 'Editing', archived: false },
		{ title: title, description }
	)
	if (!editied) return res.status(400).json({ message: 'No document with this id' })
	res.status(200).json({ editied })
})

export const getClonedDocs = asyncHandler(async (req: any, res: any) => {
	const cloneDoc = await CloneDocument.find({ cloneBy: req.id, stage: 'Editing' })

	const cloneDocList = [...cloneDoc]

	res.status(200).json({ cloneDocList })
})
export const editCloneDoc = asyncHandler(async (req: any, res: any) => {
	const payload = req.body
	console.log(payload)

	const { title, description, cloneDocumentId } = payload
	if (!title || !description || !cloneDocumentId)
		return res.status(400).json({ message: 'Please provide all inputs' })

	const editied = await CloneDocument.findOneAndUpdate(
		{ cloneDocumentId, stage: 'Editing' },
		{ title: title, description }
	)
	console.log(editied)
	if (!editied) return res.status(400).json({ message: 'No document with this id' })
	res.status(200).json({ editied })
})

// admin
