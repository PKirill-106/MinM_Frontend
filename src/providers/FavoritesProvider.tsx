'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getLocalFavorites, saveLocalFavorites } from '@/lib/localFavorites'
import { IFavoritesContext } from '@/types/Interfaces'
import {
	addProductToWishList,
	getAllProductsFromWishList,
	removeProductFromWishList,
} from '@/lib/services/wishlistService'

const FavoritesContext = createContext<IFavoritesContext | null>(null)

export const FavoritesProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { data: session } = useSession()
	const [favorites, setFavorites] = useState<string[]>([])
	const [favCount, setFavCount] = useState(0)

	const isAuthenticated = !!session?.user

	useEffect(() => {
		const loadFavorites = async () => {
			if (isAuthenticated) {
				try {
					const serverFavorites = await getAllProductsFromWishList()
					const ids = serverFavorites.map(p => p.id)
					setFavorites(ids)
				} catch (err) {
					console.error('Failed to load server wishlist:', err)
				}
			} else {
				setFavorites(getLocalFavorites())
			}
		}

		loadFavorites()
	}, [isAuthenticated])

	useEffect(() => {
		const migrateFavorites = async () => {
			if (!isAuthenticated) return
			const localFavorites = getLocalFavorites()
			if (!localFavorites.length) return

			try {
				await Promise.all(localFavorites.map(id => addProductToWishList(id)))
				localStorage.removeItem('favorites')
			} catch (err) {
				console.error('Migration failed:', err)
			}
		}

		migrateFavorites()
	}, [isAuthenticated])

	const triggerAnimation = () => {
		setFavCount(prev => prev + 1)
		setTimeout(() => {
			setFavCount(prev => prev - 1)
		}, 1500)
	}

	const addFavorite = async (productId: string) => {
		if (favorites.includes(productId)) return

		const updated = [...favorites, productId]
		setFavorites(updated)

		if (isAuthenticated) {
			try {
				await addProductToWishList(productId)
			} catch (err) {
				console.error('Failed to add to wishlist:', err)
			}
		} else {
			saveLocalFavorites(updated)
		}

		triggerAnimation()
	}

	const removeFavorite = async (productId: string) => {
		const updated = favorites.filter(id => id !== productId)
		setFavorites(updated)

		if (isAuthenticated) {
			try {
				await removeProductFromWishList(productId)
			} catch (err) {
				console.error('Failed to remove from wishlist:', err)
			}
		} else {
			saveLocalFavorites(updated)
		}

		triggerAnimation()
	}

	const isFavorite = (productId: string) => favorites.includes(productId)

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addFavorite,
				removeFavorite,
				isFavorite,
				favCount,
				triggerAnimation,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export const useFavorites = () => {
	const context = useContext(FavoritesContext)
	if (!context) {
		throw new Error('useFavorites must be used within FavoritesProvider')
	}
	return context
}
