'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getLocalFavorites, saveLocalFavorites } from '@/lib/localFavorites'
import { IFavoritesContext } from '@/types/Interfaces'

const FavoritesContext = createContext<IFavoritesContext | null>(null)

export const FavoritesProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { data: session } = useSession()
	const [favorites, setFavorites] = useState<string[]>([])
	const [favCount, setFavCount] = useState(0)

	useEffect(() => {
		const loadFavorites = async () => {
			if (session?.user) {
				// const serverFavorites = await getFavorites()
				// setFavorites(serverFavorites)
			} else {
				setFavorites(getLocalFavorites())
			}
		}
		loadFavorites()
	}, [session])

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

		if (session?.user) {
			// await addFavoriteToServer(productId)
		} else {
			saveLocalFavorites(updated)
		}

		triggerAnimation()
	}

	const removeFavorite = async (productId: string) => {
		const updated = favorites.filter(id => id !== productId)
		setFavorites(updated)

		if (session?.user) {
			// await removeFavoriteFromServer(productId)
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
