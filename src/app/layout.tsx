import type { Metadata, Viewport } from 'next'
import { Roboto, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { getAllCategories } from '@/lib/services/categoryServices'
import { ICategory, IProduct } from '@/types/Interfaces'
import { getAllProducts } from '@/lib/services/productServices'

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const categories: ICategory[] = await getAllCategories()
	const products: IProduct[] = await getAllProducts()

	return (
		<html lang='ua' className='h-full'>
			<body
				className={`${montserrat.variable} ${roboto.variable} min-h-screen antialiased`}
			>
				<Navbar categories={categories} products={products} />
				<Breadcrumbs categories={categories} products={products} />
				<main className='main-section flex-1'>{children}</main>
				<Footer categories={categories} />
			</body>
		</html>
	)
}
