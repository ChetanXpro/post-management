import User from '../Models/User'
import { Router } from 'express'
import { createNewUser, getUserById, login } from '../Controller/userController'
import verifyJWT from '../Middleware/verifyJwt'

const router = Router()

router.post('/', createNewUser)
router.post('/auth', login)
router.get('/getUser', verifyJWT, getUserById)

export default router
