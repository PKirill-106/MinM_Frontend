import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	async req => {
		const token = req.nextauth.token
		console.log('\n--- Middleware triggered ---')
		console.log('Token exists:', !!token)
		console.log('Token role:', token?.role)
		console.log('Token expiresAt:', token?.expiresAt)
		console.log('Token accessToken:', token?.accessToken)
		console.log('Token refreshToken:', token?.refreshToken)

		if (token?.error === 'REQUIRE_REAUTH') {
			console.log('Token requires re-auth, redirecting to sign-in')
			return NextResponse.redirect(new URL('/sign-in', req.url))
		}

		if (req.nextUrl.pathname.startsWith('/admin')) {
			console.log('Admin route check')
			if (token?.role !== 'Admin') {
				console.log('Redirecting to profile (not admin)')
				return NextResponse.redirect(new URL('/profile', req.url))
			}
		}

		return NextResponse.next()
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
		pages: {
			signIn: '/sign-in',
		},
		secret: process.env.NEXTAUTH_SECRET,
	}
)

export const config = {
	matcher: ['/admin/:path*', '/profile/:path*'],
}

