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
		accessToken: data.data.accessToken,
		refreshToken: data.data.refreshToken,
		expiresAt: data.data.expiresAt,
	}
}

export async function logout(accessToken: string, refreshToken: string) {
	try {
		const res = await fetch(`${API_URL}/api/User/Logout`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken,
				refreshToken,
			}),
		})

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(errorData.message || 'Logout failed')
		}

		const data = await res.json()

		return {
			success: true,
			message: data.message || 'Logged out successfully',
		}
	} catch (error) {
		console.error('Logout error:', error)
		return {
			success: false,
			message: error instanceof Error ? error.message : 'Logout failed',
		}
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

export async function refreshTokens(accessToken: string, refreshToken: string) {
	try {
		const res = await fetch(`${API_URL}/api/User/RefreshToken`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ accessToken, refreshToken }),
		})

		const data = await res.json()
		console.log('[refreshTokens] Response:', data)

		if (!res.ok || !data?.data?.accessToken) {
			throw new Error(data.message || 'REFRESH_FAILED')
		}

		const now = Date.now()
		return {
			accessToken: data.data.accessToken,
			refreshToken: data.data.refreshToken || refreshToken,
			expiresAt:
				data.data.expiresAt ||
				new Date(Date.now() + 15 * 60 * 1000).toISOString(),
			accessExpiresAt: new Date(now + 60 * 1000).toISOString(),
		}
	} catch (error) {
		console.error('[refreshTokens] Error:', error)
		throw error
	}
}

