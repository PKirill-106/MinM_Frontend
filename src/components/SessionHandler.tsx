'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

export default function SessionHandler() {
	const { data: session } = useSession()

	useEffect(() => {
		if (session?.error === 'REQUIRE_REAUTH') {
			signOut({ callbackUrl: '/sign-in' })
		}
	}, [session])

	return null
}
