'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from '../UI/button'
import { IProfileButtonsProps } from './interfaces'
import { logout } from '@/lib/services/userServices'
import toast from 'react-hot-toast'

export function ProfileButtons({ changed, onSave }: IProfileButtonsProps) {
	const { data: session } = useSession()
	const handleLogout = async () => {
		const accessToken = session?.user?.accessToken
		const refreshToken = session?.user?.refreshToken

		try {
			if (accessToken && refreshToken) {
				await logout(accessToken, refreshToken) // вызов бэкенда
			}

			await signOut({ redirect: true, callbackUrl: '/' }) // выход из next-auth
			toast.success('Ви вийшли з акаунту')
		} catch (err) {
			console.error('Logout error:', err)
			toast.error('Сталася помилка при виході з акаунту')
		}
	}

	return (
		<div className='w-full flex justify-between items-center'>
			<Button variant='outline' onClick={handleLogout}>
				Вийти з акаунту
			</Button>

			<Button onClick={onSave} disabled={!changed}>
				Зберегти зміни
			</Button>
		</div>
	)
}
