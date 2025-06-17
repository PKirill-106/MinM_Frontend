'use client'

import { useFavorites } from '@/providers/FavoritesProvider'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

interface INavCounterWrapper {
	children: React.ReactNode
	type: 'favorites' | 'cart'
}

export default function NavCounterWrapper({ children, type }: INavCounterWrapper) {
	const { favorites } = useFavorites()
  
  let link = ''
  if(type === 'favorites'){
    link = '/favorites'
  }

	return (
		<Link href={link} className='relative'>
			<motion.div
				key={favorites.length}
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				{children}
			</motion.div>

			<AnimatePresence>
				{favorites.length > 0 && (
					<motion.div
						key='count'
						className='absolute -bottom-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					>
						{favorites.length}
					</motion.div>
				)}
			</AnimatePresence>
		</Link>
	)
}
