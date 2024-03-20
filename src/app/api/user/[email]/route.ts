import { NextRequest } from 'next/server'
import { connectToDB } from '../../../../../lib/mongoDB'
import User from '../../../../../models/User'

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
	try {
		await connectToDB()

		const user = await User.findOne({ email: params.email })

		if (!user) {
			throw new Error('User not found')
		}

		return new Response(JSON.stringify(user), { status: 200 })
	} catch (err: unknown | any) {
		console.log(err)
		throw new Error(`Failed to get user ${err.message}`)
	}
}
