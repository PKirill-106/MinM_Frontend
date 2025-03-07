import React from 'react'
import Button from './UI/Button'
import CatalogDropdown from './UI/CatalogDropdown'
import { Heart, Instagram, Search, ShoppingBag, User } from 'lucide-react'

export default function Navbar() {
	return (
		<nav className='flex navbar'>
			<div className='flex align-center'>
				<CatalogDropdown />
				<Instagram />
			</div>

			<div className=' justify-center '>
				<img src='/logo.svg' alt='logo' className='h-50' />
			</div>

			<div>
				<Search />
				<User />
				<Heart />
				<ShoppingBag />
			</div>
		</nav>
	)
}
