'use client'
import { Heart, Instagram, Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import CatalogDropdown from './UI/CatalogDropdown'
import Logo from './UI/Logo'

export default function Navbar() {
	

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

					<Logo width={250} height={100} isFooter={false}/>

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
