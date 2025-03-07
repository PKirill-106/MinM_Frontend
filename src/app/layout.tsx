import type { Metadata } from 'next'
import { Roboto, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic'],
})

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: 'M in M',
	description: 'Premium nail care services for flawless results',
	keywords:
		'nail care, manicure, pedicure, beauty, M in M, M-in-M, MinM, minm, m-in-m',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ua'>
			<body className={`${montserrat.variable} ${roboto.variable} antialiased`}>
				<Navbar />
				{children}
			</body>
		</html>
	)
}
