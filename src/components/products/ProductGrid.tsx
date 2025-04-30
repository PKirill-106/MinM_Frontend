import { IProductGrid } from '@/types/Interfaces'
import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, categories }: IProductGrid) {
	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
			{products.map(product => (
				<ProductCard
					key={product.id}
					product={product}
					categories={categories}
				/>
			))}
		</div>
	)
}
