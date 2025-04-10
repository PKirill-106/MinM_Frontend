
import { IProduct } from '@/types/Interfaces'
import { useEffect, useState } from 'react'

function useProducts() {
	const [products, setProducts] = useState<IProduct[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('/MOCK_DATA.json')
				if (!response.ok) throw new Error('Failed to fetch products')
				const json = await response.json()
				setProducts(json.products)
			} catch (error) {
				console.error(error)
				setError('Failed to load products')
			} finally {
				setIsLoading(false)
			}
		}

		fetchProducts()
	}, [])

	return { products, isLoading, error }
}

export default useProducts
