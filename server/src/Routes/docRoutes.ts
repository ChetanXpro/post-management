import {
	approveDocument,
	cloneDocument,
	createDocuments,
	createNewVersion,
	editCloneDoc,
	editCreatorDocs,
	getAllPublicDoc,
	getClonedDocs,
	getEditingDocs,
	getPendingDocs,
	rejectCloneDocument,
	rejectDocument,
	submitCloneDocument,
	submitForReview,
} from '../Controller/documentController'
import { Router } from 'express'
import verifyJWT from '../Middleware/verifyJwt'

const router = Router()

router.post('/', verifyJWT, createDocuments)
router.get('/', verifyJWT, getAllPublicDoc)
router.get('/getPending', verifyJWT, getPendingDocs)
router.get('/getEditing', verifyJWT, getEditingDocs)
router.get('/getClone', verifyJWT, getClonedDocs)
router.put('/edit', verifyJWT, editCreatorDocs)
router.post('/submit', verifyJWT, submitForReview)
router.post('/clone', verifyJWT, cloneDocument)
router.put('/editclone', verifyJWT, editCloneDoc)
router.post('/submitclone', verifyJWT, submitCloneDocument)
router.post('/admin/approve', verifyJWT, approveDocument)
router.post('/admin/reject', verifyJWT, rejectDocument)
router.post('/admin/approveclone', verifyJWT, createNewVersion)
router.post('/admin/rejectclone', verifyJWT, rejectCloneDocument)

export default router
// Missed last 2 workshop now i feel i missed a lot , will cover up before next workshop
