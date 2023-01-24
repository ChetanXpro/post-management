import {
	approveDocument,
	cloneDocument,
	createDocuments,
	createNewVersion,
	getAllPublicDoc,
	rejectDocument,
	submitCloneDocument,
	submitForReview,
} from '../Controller/documentController'
import { Router } from 'express'
import verifyJWT from '../Middleware/verifyJwt'

const router = Router()

router.post('/', verifyJWT, createDocuments)
router.get('/', verifyJWT, getAllPublicDoc)
router.post('/submit', verifyJWT, submitForReview)
router.post('/clone', verifyJWT, cloneDocument)
router.post('/submitclone', verifyJWT, submitCloneDocument)
router.post('/admin/approve', verifyJWT, approveDocument)
router.post('/admin/reject', verifyJWT, rejectDocument)
router.post('/admin/approveclone', verifyJWT, createNewVersion)
router.post('/admin/rejectclone', verifyJWT, createNewVersion)

export default router
