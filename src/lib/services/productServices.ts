const API_URL = process.env.NEXT_PUBLIC_API_URL

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function getAllProducts() {
	const res = await fetch(`${API_URL}/api/Product/GetAll`, {
		method: 'GET',
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch products: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}
