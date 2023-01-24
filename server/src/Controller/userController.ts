import tryUser from '../Models/User'

import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// @ Create new user
export const createNewUser = asyncHandler(async (req: any, res: any) => {
	const { role, name, email, password } = req.body

	if (!name || !password || !email) {
		return res.status(400).json({ message: 'Al fields are require' })
	}

	const duplicates = await tryUser.find({ email }).lean().exec()

	if (duplicates.length) {
		return res.status(409).json({
			message: 'Email already exist',
		})
	}

	const hashedPwd = await bcrypt.hash(password, 10)

	const userObject = { email, password: hashedPwd, role, name }

	const user = await tryUser.create(userObject)

	if (!user) res.status(400).json({ messssage: `Invalid user data recevied` })

	res.status(201).json({ message: `New user ${email} created` })
})

export const getUserById = asyncHandler(async (req: any, res: any) => {
	const id = req.id

	if (!id) {
		return res.sendStatus(500).json({ success: false, message: 'something went wrong' })
	}

	const foundUser = await tryUser.findById(id)

	if (!foundUser) return res.status(400).json({ success: false, message: 'No user found with this id' })

	const userInfo = {
		email: foundUser.email,
		name: foundUser.name,
		role: foundUser.roles,
	}

	res.status(200).json(userInfo)
})

export const login = asyncHandler(async (req: any, res: any) => {
	const cookies = req.cookies
	console.log(req.body)
	const { email, password } = req.body
	if (!email || !password) {
		res.status(400).json({ message: 'All field are required' })
	}

	const foundUser: any = await tryUser.findOne({ email }).exec()

	if (!foundUser || !foundUser.active) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	const match = bcrypt.compare(password, foundUser.password)

	if (!match) return res.status(401).json({ message: 'Unauthorized' })
	const secret = process.env.ACCESS_TOKEN_SECRET || ''
	const accessToken = jwt.sign(
		{
			id: foundUser.id,
			role: foundUser.roles,
		},
		secret,
		{ expiresIn: '24h' }
	)

	res.json({ email: foundUser.email, name: foundUser.name, accessToken })
})
