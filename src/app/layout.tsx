import type { Metadata, Viewport } from 'next'
import { Roboto, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
	keywords: [
		'nail care',
		'manicure',
		'pedicure',
		'beauty',
		'M in M',
		'M-in-M',
		'MinM',
		'minm',
		'm-in-m',
	],
}

export const viewport: Viewport = {
	colorScheme: 'light',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ua' className='h-full'>
			<body
				className={`${montserrat.variable} ${roboto.variable} min-h-screen antialiased`}
			>
				<Navbar />
				<main className='flex-1 mt-[70px]'>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
