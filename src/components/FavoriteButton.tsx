'use client'

import { useFavorites } from '@/providers/FavoritesProvider'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FavoriteButton({ productId }: { productId: string }) {
	const { isFavorite, addFavorite, removeFavorite } = useFavorites()
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		isFavorite(productId)
	}, [productId])

	const handleClick = () => {
		if (isFavorite(productId)) {
			removeFavorite(productId)
		} else {
			addFavorite(productId)
		}

		setAnimate(true)
		setTimeout(() => setAnimate(false), 300)

		setTimeout(() => window.dispatchEvent(new Event('favorites-changed')), 400)
	}

	return (
		<button
			onClick={handleClick}
			className={`absolute top-0 right-0 p-2 md:p-3 lg:p-4 hover:text-red-500 transition cursor-pointer ${
				animate ? 'scale-120' : ''
			}`}
		>
			<Heart
				className={`h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 ${
					isFavorite(productId) ? 'fill-red-500 text-red-500' : ''
				}`}
			/>
		</button>
	)
}
