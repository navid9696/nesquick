import { withAuth } from 'next-auth/middleware'

export default withAuth({
	pages: {
		signIn: '/authorize',
	},
})

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/search:path*', '/movies', '/favorites', '/', '/series'],
}
