import { withAuth } from 'next-auth/middleware'

export default withAuth({
	pages: {
		signIn: '/authorize',
	},
})


export const config = {
	matcher: ['/search:path*', '/movies', '/favorites', '/', '/series'],
}
