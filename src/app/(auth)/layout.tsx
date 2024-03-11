import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

import { Providers } from '@app/(root)/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Nesquik Auth',
	description: 'Netflix clone Auth',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className='bg-black ' lang='en'>
			<body className={`${inter.className} `}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
