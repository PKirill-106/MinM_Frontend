'use client'
import React, { useEffect, useState } from 'react'
import CatalogDropdown from './UI/CatalogDropdown'
import { Heart, Instagram, Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
	const pathname = usePathname()
	const [currentPath, setCurrentPath] = useState('')

	useEffect(() => {
		setCurrentPath(pathname)
	}, [pathname])


	const isHome = currentPath === '/'

	return (
		<header className='bg-white p-3'>
			<div className='container'>
				<nav className='flex items-center justify-between md:gap-[15px] w-full'>
					<div className='flex items-center gap-[30px] flex-1'>
						<CatalogDropdown />
						<Link href='https://www.instagram.com/minmchik_/' target='_blank'>
							<Instagram className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 link-hover' />
						</Link>
					</div>

					<div className='w-[250px] flex justify-center'>
						{isHome ? (
							<Image
								src='/logo.svg'
								alt='logo'
								className='object-contain'
								width={250}
								height={100}
							/>
						) : (
							<Link
								href='/'
								className={`items-center ${
									isHome ? '' : `hover:scale-110 duration-300 hover:text-accent`
								} `}
							>
								<Image
									src='/logo.svg'
									alt='logo'
									className='object-contain'
									width={250}
									height={100}
								/>
							</Link>
						)}
					</div>

					<div className='flex gap-[30px] items-center justify-end translate-x-[10px] flex-1'>
						<Link href=''>
							<Search className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 link-hover' />
						</Link>
						<Link href=''>
							<User className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 link-hover' />
						</Link>
						<Link href=''>
							<Heart className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 link-hover' />
						</Link>

						<Link
							href=''
							className='relative -translate-x-[10px] p-[10px] transition-all duration-400 bg-button rounded-md hover:bg-accent hover:text-button group'
						>
							<ShoppingBag className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 cursor-pointer transition-transform group-hover:scale-110' />
						</Link>
					</div>
				</nav>
			</div>
		</header>
	)
}
