'use client'

import { SessionProvider } from 'next-auth/react'

const Auth = ({ children }: { children: React.ReactNode }) => {
	return <SessionProvider>{children}</SessionProvider>
}

export default Auth
