'use client'

import {
	Heart,
	Instagram,
	Menu,
	Search,
	ShoppingBag,
	User,
	X,
} from 'lucide-react'
import Link from 'next/link'
import CatalogDropdown from '../CatalogDropdown'
import Logo from '../UI/Logo'
import { useEffect, useRef, useState } from 'react'
import CategoryList from '../category-lists/CategoryList'
import Tooltip from '../UI/Tooltip'

export default function Navbar() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	return (
		<header className='z-10 top-0 left-0 fixed w-full bg-white p-2 lg:px-15 xl:px-30'>
			<nav className='container flex items-center justify-between md:gap-[15px] w-full'>
				<div className='hidden md:flex items-center gap-5 xl:gap-7 md:flex-1'>
					<CatalogDropdown />
					<Tooltip content='Instagram'>
						<Link href='https://www.instagram.com/minmchik_/' target='_blank'>
							<Instagram className='link-size link-hover' />
						</Link>
					</Tooltip>
				</div>

				<Logo width={250} height={100} isFooter={false} priority />

				<div className='flex gap-5 xl:gap-7 items-center justify-end md:translate-x-2 md:flex-1'>
					<Tooltip content='Пошук'>
						<Link href=''>
							<Search className='link-size link-hover' />
						</Link>
					</Tooltip>

					<Tooltip content='Мій профіль' className='hidden md:flex'>
						<Link href=''>
							<User className='link-size link-hover' />
						</Link>
					</Tooltip>

					<Tooltip content='Обране' className='hidden md:flex'>
						<Link href=''>
							<Heart className='link-size link-hover' />
						</Link>
					</Tooltip>

					<Tooltip content='Кошик' isShoppingBag={true}>
						<Link
							href=''
							className='md:relative md:-translate-x-2 md:p-1.5 lg:p-2 xl:p-3 transition-all duration-400 md:text-button-text md:bg-button rounded-md hover:bg-accent hover:text-button group'
						>
							<ShoppingBag className='link-size cursor-pointer transition-transform group-hover:scale-110' />
						</Link>
					</Tooltip>

					<div className='md:hidden flex items-center'>
						<button onClick={() => setIsOpen(!isOpen)}>
							{isOpen ? (
								<X className='h-8 w-8' />
							) : (
								<Menu className='h-7 w-7' />
							)}
						</button>
					</div>
				</div>
			</nav>
			<div
				className={`fixed top-0 right-0 w-3/4 max-w-xs h-screen bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div ref={menuRef} className='p-5 flex flex-col gap-6'>
					<button onClick={() => setIsOpen(false)} className='self-end pr-2'>
						<X className='h-6 w-6' />
					</button>
					<hr />
					<CategoryList
						className='flex flex-col gap-5 text-base'
						isFooter={false}
					/>
					<hr />
					<div className='flex flex-col gap-8'>
						<Link href='' className='flex items-center gap-3'>
							<User className='h-6 w-6 link-hover' />
							<span>Мій профіль</span>
						</Link>

						<Link href='' className='flex items-center gap-3'>
							<Heart className='h-6 w-6 link-hover' />
							<span>Збережене</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
