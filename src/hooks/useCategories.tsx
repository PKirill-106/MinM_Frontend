import { ICategory } from '@/types/Interfaces'
import React, { useEffect, useState } from 'react'

function useCategories() {
	const [categories, setCategories] = useState<ICategory[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					'https://api.escuelajs.co/api/v1/categories'
				)
				if (!response.ok)
					throw new Error(`HTTP error! Status: ${response.status}`)

				const data: ICategory[] = await response.json()

				setCategories(data)
			} catch (error) {
				setError('Failed to load categories')
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		fetchCategories()
	}, [])

	return { categories, loading, error }
}

export default useCategories
