'use server'

const API_URL = process.env.NEXT_PUBLIC_API_URL

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function getAllProductsFromCart(token: string) {
	const res = await fetch(`${API_URL}/api/Cart/GetAll`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	if (!res.ok && res.status !== 404) throw new Error('Failed to fetch Cart')

	const { data } = await res.json()

	return data
}

export async function getProductFromCart(productIds: string, token: string) {
	const res = await fetch(`${API_URL}/api/Cart/Get?productId=${productIds}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	if (!res.ok) throw new Error('Product is not in Cart')
	return res.json()
}

export async function addProductToCart(
	productIds: string,
	token: string,
	quantity: number
) {
	const res = await fetch(
		`${API_URL}/api/Cart/Create?productId=${productIds}`,
		{
			method: 'POST',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)

	if (!res.ok) throw new Error(`Add to Cart failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function removeProductFromCart(productIds: string, token: string) {
	const res = await fetch(
		`${API_URL}/api/Cart/Delete?productId=${productIds}`,
		{
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	)

	if (!res.ok) throw new Error(`Remove from Cart failed: ${res.status}`)

	const { data } = await res.json()

	return data
}
