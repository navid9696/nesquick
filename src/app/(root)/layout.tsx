import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Nesquik',
	description: 'Netflix clone',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className='bg-black scrollbar-hide scroll-smooth ' style={{ scrollBehavior: 'smooth' }} lang='en'>
			<body id='top' className={`${inter.className} `}>
				{children}
			</body>
		</html>
	)
}
