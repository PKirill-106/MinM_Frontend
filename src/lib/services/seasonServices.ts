'use server'

import { ICreateSeason, IUpdateSeason } from "@/types/Interfaces"

const API_URL = process.env.NEXT_PUBLIC_API_URL

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function getAllSeasons() {
	const res = await fetch(`${API_URL}/api/Season/GetAll`)
	if (!res.ok) throw new Error(`Season GET ALL failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function getSeasonById(id: string) {
	const res = await fetch(`${API_URL}/api/Season/GetById?id=${id}`)
	if (!res.ok) throw new Error(`Season GET BY ID failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function getSeasonBySlug(slug: string) {
	const res = await fetch(`${API_URL}/api/Season/${slug}`)
	if (!res.ok) throw new Error(`Season GET BY SLUG failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function createSeason(seasonDate: ICreateSeason) {
	const res = await fetch(`${API_URL}/api/Season/Create`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(seasonDate),
	})
	if (!res.ok) throw new Error(`Season CREATE failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function updateSeason(seasonDate: IUpdateSeason) {
	const res = await fetch(`${API_URL}/api/Season/Update`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(seasonDate),
	})
	if (!res.ok) throw new Error(`Season UPDATE failed: ${res.status}`)

	const { data } = await res.json()

	return data
}
