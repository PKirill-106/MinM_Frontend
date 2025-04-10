'use client'
import { IProduct } from '@/types/Interfaces'
import Link from 'next/link'
import ProductCard from './ProductCard'
import { ChevronRight } from 'lucide-react'

interface Props {
	title: string
	highlight?: string
	products: IProduct[]
	linkLabel: string
	linkHref: string
}

export default function ProductSection({
	title,
	highlight,
	products,
	linkLabel,
	linkHref,
}: Props) {
	return (
		<div>
			<h2 className='max-w-[320px] mx-auto text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-6 md:mb-8 lg:mb-12 xl:mb-15'>
				{highlight ? (
					<>
						<span className='text-accent font-bold'>{highlight}</span>{' '}
						{title.replace(highlight, '')}
					</>
				) : (
					title
				)}
			</h2>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}

				<Link
					href={linkHref}
					className='bg-foreground text-white rounded-lg flex items-center justify-center text-center font-semibold hover:bg-accent hover:scale-105 hover:shadow-lg transition-all duration-300 px-4 py-6 text-sm'
				>
					<h3 className='flex flex-col items-center'>
						{linkLabel} <div className='my-4' /> <ChevronRight />
					</h3>
				</Link>
			</div>
		</div>
	)
}
