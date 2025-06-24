import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInUser } from './services/userServices'
import { jwtDecode } from 'jwt-decode'

type DecodedJwt = {
	sub?: string
	id?: string
	email?: string
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string
	'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string
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
				}
			},
		}),
	],

	pages: {
		signIn: '/sign-in',
	},

	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.role = user.role
				token.accessToken = user.accessToken
			}
			return token
		},

		async session({ session, token }) {
			session.user.email = token.email as string
			session.user.role = token.role as string
			;(session as any).accessToken = token.accessToken as string
			return session
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
}

export { getServerSession } from 'next-auth'
