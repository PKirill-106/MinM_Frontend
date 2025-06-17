import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	req => {
		const token = req.nextauth.token
		if (req.nextUrl.pathname.startsWith('/admin')) {
			if (token?.role !== 'Admin') {
				return NextResponse.redirect(new URL('/profile', req.url))
			}
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				return !!token
			},
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
