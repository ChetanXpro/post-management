import User from '../Models/User'
import { Router } from 'express'
import { createNewUser, login } from '../Controller/userController'
import verifyJWT from '../Middleware/verifyJwt'

const router = Router()

router.post('/', createNewUser)
router.post('/auth', login)

export default router
