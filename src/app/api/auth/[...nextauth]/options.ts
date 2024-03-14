import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDB } from '../../../../../lib/mongoDB'
import User from '../../../../../models/User'
import { compare } from 'bcryptjs'

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',

			credentials: {
				userEmail: { label: 'Email', type: 'email' },
				userPassword: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.userEmail || !credentials?.userPassword) {
					throw new Error('Email and password are required')
				}

				await connectToDB()

				const user = await User.findOne({ userEmail: credentials?.userEmail })

				if (!user) {
					throw new Error('No user found')
				}

				const isMatchedPassword = await compare(credentials?.userPassword, user.userPassword)

				if (!isMatchedPassword) {
					throw new Error('Incorrect password')
				}

				return user
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
}
