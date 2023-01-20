import { createDocuments } from '../Controller/documentController'
import { Router } from 'express'
import verifyJWT from '../Middleware/verifyJwt'

const router = Router()

router.post('/', verifyJWT, createDocuments)

export default router
