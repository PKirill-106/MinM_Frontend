import { ICartItem } from '@/types/Interfaces'

export const getLocalCart = (): ICartItem[] => {
	if (typeof window === 'undefined') return []
	const json = localStorage.getItem('cartProducts')
	try {
		return json ? JSON.parse(json) : []
	} catch {
		return []
	}
}

export const saveLocalCart = (cart: ICartItem[]) => {
	localStorage.setItem('cartProducts', JSON.stringify(cart))
}

export const addToCart = (id: string, variantId: string, quantity: number) => {
	const current = getLocalCart()
	const index = current.findIndex(
		item => item.id === id && item.variantId === variantId
	)

	let updated: ICartItem[]
	if (index !== -1) {
		current[index].quantity += quantity
		updated = [...current]
	} else {
		updated = [...current, { id, variantId, quantity }]
	}

	saveLocalCart(updated)
}

export const removeFromCart = (
	id: string,
	variantId: string,
	removeCompletely = true
) => {
	let current = getLocalCart()
	const index = current.findIndex(
		item => item.id === id && item.variantId === variantId
	)

	if (index === -1) return

	if (removeCompletely || current[index].quantity <= 1) {
		current = current.filter(
			item => !(item.id === id && item.variantId === variantId)
		)
	} else {
		current[index].quantity -= 1
	}

	saveLocalCart(current)
}

export const updateCartQuantity = (
	id: string,
	variantId: string,
	quantity: number
) => {
	const current = getLocalCart()
	const index = current.findIndex(
		item => item.id === id && item.variantId === variantId
	)

	if (index === -1) return

	if (quantity <= 0) {
		removeFromCart(id, variantId)
		return
	}

	current[index].quantity = quantity
	saveLocalCart([...current])
}

export const isInCart = (id: string, variantId: string): boolean => {
	return getLocalCart().some(
		item => item.id === id && item.variantId === variantId
	)
}

export const getQuantity = (id: string, variantId: string): number => {
	const item = getLocalCart().find(
		item => item.id === id && item.variantId === variantId
	)
	return item?.quantity ?? 0
}
