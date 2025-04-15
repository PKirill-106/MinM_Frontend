const API_URL = process.env.NEXT_PUBLIC_API_URL

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function getAllCategories() {
	const res = await fetch(`${API_URL}/Category/GetAll`, {
		method: 'GET',
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch categories: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}
