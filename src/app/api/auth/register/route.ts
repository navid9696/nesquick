import { NextRequest } from 'next/server'
import { connectToDB } from '../../../../../lib/mongoDB'
import User from '../../../../../models/User'
import { hash } from 'bcryptjs'

export const POST = async (req: NextRequest) => {
	try {
		await connectToDB()

		const { userEmail, userPassword } = await req.json()
		const existingUser = await User.findOne({ userEmail })

		if (existingUser) {
			return new Response('User already exists', { status: 400 })
		}

		const hashedPassword = await hash(userPassword, 10)

		const newUser = new User({
			userEmail,
			userPassword: hashedPassword,
		})

		await newUser.save()

		return new Response(JSON.stringify(newUser), { status: 201 })
	} catch (err) {
		console.log(err)
		return new Response('Failed to create a new user', { status: 500 })
	}
}
