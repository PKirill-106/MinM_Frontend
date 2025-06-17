'use client'

import ProductGrid from '@/components/products/ProductGrid'
import { getLocalFavorites } from '@/lib/localFavorites'
import {
  IProductGrid
} from '@/types/Interfaces'
import { useEffect, useState } from 'react'

export default function FilteredFavoriteGrid({
	products,
	categories,
}: IProductGrid) {
	const [favoriteIds, setFavoriteIds] = useState<string[]>([])

	useEffect(() => {
		setFavoriteIds(getLocalFavorites())

		const handler = () => setFavoriteIds(getLocalFavorites())
		window.addEventListener('favorites-changed', handler)

		return () => {
			window.removeEventListener('favorites-changed', handler)
		}
	}, [])

	const favoriteProducts = products.filter(product =>
		favoriteIds.includes(product.id)
	)

	return <ProductGrid products={favoriteProducts} categories={categories} type='favorites' />
}
