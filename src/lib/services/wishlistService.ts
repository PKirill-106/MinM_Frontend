'use server'

const API_URL = process.env.NEXT_PUBLIC_API_URL

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export const getAllProductsFromWishList = async (): Promise<
	{ id: string }[]
> => {
	const res = await fetch(`${API_URL}/GetAllProductsFromWishList`, {
		method: 'GET',
		credentials: 'include',
	})
	if (!res.ok) throw new Error('Failed to fetch wishlist')
	return res.json()
}

export const getProductFromWishList = async (
	productId: string
): Promise<{ id: string }> => {
	const res = await fetch(
		`${API_URL}/GetProductFromWishList?productId=${productId}`,
		{
			method: 'GET',
			credentials: 'include',
		}
	)
	if (!res.ok) throw new Error('Product not in wishlist')
	return res.json()
}

export const addProductToWishList = async (
	productId: string
): Promise<void> => {
	await fetch(`${API_URL}/AddProductToWishList`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include', // важно, чтобы отправлялись куки сессии
		body: JSON.stringify({ productId }),
	})
}

export const updateWishList = async (productIds: string[]): Promise<void> => {
	await fetch(`${API_URL}/UpdateWishList`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(productIds),
	})
}

export const removeProductFromWishList = async (
	productId: string
): Promise<void> => {
	await fetch(`${API_URL}/RemoveWishList`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ productId }),
	})
}
