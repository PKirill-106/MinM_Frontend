import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { refreshTokens, signInUser } from './services/userServices'
import { jwtDecode } from 'jwt-decode'

type DecodedJwt = {
	sub?: string
	id?: string
	email?: string
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string
	'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string
	exp?: number
}

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) return null

				const response = await signInUser(credentials)

				if (!response?.accessToken) return null

				let decoded: DecodedJwt
				try {
					decoded = jwtDecode(response.accessToken)
				} catch {
					console.error('Decode error JWT')
					return null
				}

				return {
					id: decoded.sub || decoded?.id || '',
					email:
						decoded.email ||
						decoded[
							'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
						] ||
						response.email,
					role:
						decoded[
							'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
						] || 'user',
					accessToken: response.accessToken,
					refreshToken: response.refreshToken,
					expiresAt:
						response.expiresAt ||
						new Date((decoded.exp || 0) * 1000).toISOString(),
				}
			},
		}),
	],

	pages: {
		signIn: '/sign-in',
	},

	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.role = user.role
				token.accessToken = user.accessToken
				token.refreshToken = user.refreshToken
				token.expiresAt = user.expiresAt
			}
			// Check if token needs refresh (10 minutes before expiration)
			const expiresAt = token.expiresAt ? new Date(token.expiresAt) : null
			const shouldRefresh =
				expiresAt && expiresAt.getTime() - Date.now() < 600000

			if (!shouldRefresh) {
				return token
			}
			try {
				const refreshed = await refreshTokens(
					token.accessToken,
					token.refreshToken
				)
				return {
					...token,
					...refreshed,
					refreshedAt: Date.now(),
				}
			} catch (error: unknown) {
				console.error('Refresh token error:', error)
				if (error instanceof Error) {
					if (
						error.message === 'SESSION_EXPIRED' ||
						error.message === 'INVALID_TOKEN'
					) {
						return { ...token, error: 'REQUIRE_REAUTH' }
					}
					return { ...token, error: 'REFRESH_FAILED' }
				}
				return { ...token, error: 'REFRESH_FAILED' }
			}
		},

		async session({ session, token }) {
			session.user = {
				id: token.id,
				email: token.email,
				role: token.role,
				accessToken: token.accessToken,
				refreshToken: token.refreshToken,
				expiresAt: token.expiresAt,
			}
			if (token.error) {
				session.error = token.error
			}
			return session
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
}

export { getServerSession } from 'next-auth'
