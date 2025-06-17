'use server'

import { IApiError, ISignUpUser } from '@/types/Interfaces'

const API_URL = process.env.NEXT_PUBLIC_API_URL

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function signUpUser(userData: ISignUpUser) {
	const res = await fetch(`${API_URL}/api/User/Register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	})

	if (!res.ok) {
		const errorData: IApiError = await res.json().catch(() => ({}))

		if (res.status === 400 && errorData.errors?.DuplicateUserName) {
			throw new Error(
				'Цей email вже зареєстрований. Використайте інший email або увійдіть у систему.'
			)
		}

		if (res.status === 400 && errorData.errors) {
			const passwordErrors = errorData.errors
			let errorMessage = 'Пароль повинен містити мінімум: '

			const requirements = []
			if (passwordErrors.PasswordTooShort) requirements.push('8 символів')
			if (passwordErrors.PasswordRequiresNonAlphanumeric)
				requirements.push('1 спецсимвол (!@# і т.д.)')
			if (passwordErrors.PasswordRequiresDigit)
				requirements.push('1 цифра (0-9)')
			if (passwordErrors.PasswordRequiresUpper)
				requirements.push('1 велика літера (A-Z)')

			if (requirements.length > 0) {
				errorMessage += requirements.join(', ')
				throw new Error(errorMessage)
			}
		}

		throw new Error(
			errorData.message || 'Сталася невідома помилка під час реєстрації'
		)
	}
	return true
}

export async function signInUser(credentials: {
	email: string
	password: string
}) {
	const res = await fetch(`${API_URL}/api/User/Login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})

	if (!res.ok) {
		const text = await res.text().catch(() => '[No body]')
		console.error('Backend returned non-200:', res.status, text)
		throw new Error(`Failed to sign in: ${res.status}`)
	}

	const data = await res.json()

	if (!data?.data) {
		throw new Error('Missing tokens in response')
	}

	return {
		email: credentials.email,
		accessToken: data.data,
	}
}

export async function getUserInfo() {
	const res = await fetch(`${API_URL}/api/User/UserInfo`, {
		method: 'GET',
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch user info: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}
