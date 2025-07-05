'use client'

import { useSession, signOut } from 'next-auth/react'
import { refreshTokens } from '@/lib/services/userServices'

let refreshPromise: Promise<any> | null = null

export function useApi() {
	const { data: session, update } = useSession()

	const apiFetch = async <T = any>(
		request: (token: string) => Promise<T>
	): Promise<T> => {
		if (!session?.user) throw new Error('No session')

		let token = session.user.accessToken
		const refreshToken = session.user.refreshToken
		const accessExpiresAt = session.user.expiresAt

		if (!token || !refreshToken || !accessExpiresAt) {
			throw new Error('No token or refresh token')
		}

		const now = Date.now()
		const accessExpiresTime = new Date(accessExpiresAt).getTime()
		const shouldRefresh = accessExpiresTime - now < 30 * 1000 // 30 seconds
		if (shouldRefresh || refreshPromise) {
			console.log(
				'[useApi] Access token expiring soon or refresh in progress...'
			)
			try {
				if (!refreshPromise) {
					refreshPromise = refreshTokens(token, refreshToken)
						.then(async refreshed => {
							const now = Date.now()
							const newAccessExpiresAt = new Date(
								now + 2 * 60 * 1000
							).toISOString()
							await update({
								accessToken: refreshed.accessToken,
								refreshToken: refreshed.refreshToken,
								expiresAt: refreshed.expiresAt,
								accessExpiresAt: newAccessExpiresAt,
							})

							console.log('[useApi] Session updated with new tokens')
							return { ...refreshed, accessExpiresAt: newAccessExpiresAt }
						})
						.finally(() => {
							refreshPromise = null
						})
				}
				console.log('[useApi] Current session token:', session.user.accessToken)
				const refreshed = await refreshPromise
				token = refreshed.accessToken
			} catch (error) {
				console.error('[useApi] Token refresh failed:', error)
				await signOut({ redirect: true })
				throw error
			}
		}

		try {
			return await request(token)
		} catch (error) {
			if (error instanceof Response && error.status === 401) {
				console.log('[useApi] Received 401, attempting token refresh...')
				try {
					if (!refreshPromise) {
						refreshPromise = refreshTokens(token, refreshToken)
							.then(async refreshed => {
								const now = Date.now()
								const newAccessExpiresAt = new Date(
									now + 2 * 60 * 1000
								).toISOString() // 1 минута
								await update({
									accessToken: refreshed.accessToken,
									refreshToken: refreshed.refreshToken,
									expiresAt: refreshed.expiresAt,
									accessExpiresAt: newAccessExpiresAt,
								})

								return { ...refreshed, accessExpiresAt: newAccessExpiresAt }
							})
							.finally(() => {
								refreshPromise = null
							})
					}
					console.log(
						'[useApi] Current session token:',
						session.user.accessToken
					)
					const refreshed = await refreshPromise
					token = refreshed.accessToken

					return await request(token) // Повторяем запрос с новым токеном
				} catch (refreshError) {
					console.error('[useApi] Token refresh failed:', refreshError)
					await signOut({ redirect: true })
					throw refreshError
				}
			}
			throw error
		}
	}

	return { apiFetch }
}
