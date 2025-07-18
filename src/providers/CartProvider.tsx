'use client'

import { useApi } from '@/hooks/useApi'
import { getLocalCart, saveLocalCart } from '@/lib/localCart'
import {
	addProductToCart,
	getAllProductsFromCart,
	removeProductFromCart,
} from '@/lib/services/cartServices'
import { ICartContext, ICartItem, IProduct, VariantUpdate } from '@/types/Interfaces'
import { useSession } from 'next-auth/react'
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

const CartContext = createContext<ICartContext | null>(null)

export default function CartProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { data: session, status } = useSession()
	const hasMigrated = useRef(false)
	const [cartProducts, setCartProducts] = useState<ICartItem[]>([])
	const [cartCount, setCartCount] = useState(0)

	const { apiFetch } = useApi()
	const isAuthenticated = !!session?.user

	const loadCart = async () => {
		if (isAuthenticated) {
			try {
				const serverCart = await apiFetch(token =>
					getAllProductsFromCart(token)
				)
				setCartProducts(serverCart)
			} catch (err) {
				console.error('Failed to load server cart:', err)
			}
		} else {
			setCartProducts(getLocalCart())
		}
	}

	const migrateCart = async () => {
		if (status !== 'authenticated' || hasMigrated.current) return

		const localCart = getLocalCart()
		if (!localCart.length) return

		try {
			const serverCart: IProduct[] = await apiFetch(token =>
				getAllProductsFromCart(token)
			)
			const serverIds = serverCart.map(item => item.id)

			const toMigrate = localCart.filter(
				localItem => !serverIds.includes(localItem.id)
			)

			await Promise.all(
				toMigrate.map(item =>
					apiFetch(token => addProductToCart(item.id, token, item.quantity))
				)
			)

			localStorage.removeItem('cartProducts')
			hasMigrated.current = true

			const refreshed = await apiFetch(token => getAllProductsFromCart(token))
			setCartProducts(refreshed)
		} catch (err) {
			console.error('Cart migration failed:', err)
		}
	}

	useEffect(() => {
		loadCart()
	}, [isAuthenticated])

	useEffect(() => {
		migrateCart()
	}, [status])

	const triggerAnimation = () => {
		setCartCount(prev => prev + 1)
		setTimeout(() => {
			setCartCount(prev => prev - 1)
		}, 1500)
	}

	const addToCart = async (
		productId: string,
		variantId: string,
		quantity: number
	) => {
		let updated: ICartItem[]
		updated = [...cartProducts, { id: productId, variantId, quantity }]

		setCartProducts(updated)

		if (isAuthenticated) {
			// try {
			// 	await apiFetch(token =>
			// 		addProductToCart(productId, variantId, quantity, token)
			// 	)
			// } catch (err) {
			// 	console.error('Failed to add to cart:', err)
			// }
		} else {
			saveLocalCart(updated)
		}

		triggerAnimation()
	}

	const removeFromCart = async (productId: string, variantId: string) => {
		const updated = cartProducts.filter(
			item => !(item.id === productId && item.variantId === variantId)
		)

		setCartProducts(updated)

		if (isAuthenticated) {
			try {
				await apiFetch(token => removeProductFromCart(productId, token))
			} catch (err) {
				console.error('Failed to remove from cart:', err)
			}
		} else {
			saveLocalCart(updated)
		}

		triggerAnimation()
	}

	const updateQuantity = async (
		productId: string,
		variantId: string,
		quantity: number
	) => {
		if (quantity <= 0) {
			await removeFromCart(productId, variantId)
			return
		}

		const updated = cartProducts.map(item =>
			item.id === productId && item.variantId === variantId
				? { ...item, quantity }
				: item
		)

		setCartProducts(updated)

		if (isAuthenticated) {
			try {
				await apiFetch(token => addProductToCart(productId, token, quantity))
			} catch (err) {
				console.error('Failed to update quantity:', err)
			}
		} else {
			saveLocalCart(updated)
		}

		triggerAnimation()
	}

	const updateVariant: VariantUpdate = async (
		productId,
		oldVariantId,
		newVariantId,
	) => {
		const updated = cartProducts.map(item => {
			if (item.id === productId && item.variantId === oldVariantId) {
				return {
					...item,
					variantId: newVariantId,
				}
			}
			return item
		})

		setCartProducts(updated)

		if (!isAuthenticated) {
			saveLocalCart(updated)
		} 
		// else {
			
		// }

		triggerAnimation()
	}



	const isInCart = (productId: string) =>
		cartProducts.some(
			item => item.id === productId
		)
	const isVariantInCart = (productId: string, variantId: string) =>
		cartProducts.some(
			item => item.id === productId && item.variantId === variantId
		)

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				addToCart,
				removeFromCart,
				updateQuantity,
				isInCart,
				isVariantInCart,
				cartCount,
				triggerAnimation,
				updateVariant,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within CartProvider')
	}
	return context
}
