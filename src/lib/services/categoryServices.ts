'use server'

import { ICreateCategory, IDeleteCategory, IUpdateCategory } from '@/types/Interfaces'

const API_URL = process.env.NEXT_PUBLIC_API_URL

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function getAllCategories() {
	const res = await fetch(`${API_URL}/api/Category/GetAll`, {
		method: 'GET',
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch categories: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function createCategory(categoryData: ICreateCategory, token: string) {
	const res = await fetch(`${API_URL}/api/Category/Create`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify(categoryData),
	})

	if (!res.ok) throw new Error(`Category CREATE failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function updateCategory(categoryData: IUpdateCategory, token: string) {
	const res = await fetch(`${API_URL}/api/Category/Update`, {
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify(categoryData),
	})
	if (!res.ok) throw new Error(`Category UPDATE failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function deleteCategory(categoryData: IDeleteCategory, token: string) {
	const res = await fetch(`${API_URL}/api/Category/Delete`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify(categoryData),
	})
	if (!res.ok) throw new Error(`Category DELETE failed: ${res.status}`)
	return true
}