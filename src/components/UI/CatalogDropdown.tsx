'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ICategory } from '@/types/Interfaces'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

function CatalogDropdown() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [categories, setCategories] = useState<ICategory[]>([])
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					'https://api.escuelajs.co/api/v1/categories'
				)
				if (!response.ok)
					throw new Error(`HTTP error! Status: ${response.status}`)

				const data: ICategory[] = await response.json()

				setCategories(data)
			} catch (error) {
				console.error('Failed loading categories ', error)
			}
		}
		fetchCategories()
	}, [])

	const handleToggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				event.target instanceof Node &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [])

	return (
		<div
			ref={dropdownRef}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<Link
				href='/catalog'
				className='p-5 flex gap-1 bg-button text-button-text rounded-md hover:bg-accent hover:text-white-text transition-all duration-300 button-text cursor-pointer'
			>
				<span>Каталог продукції</span>
				<ChevronRight
					className={`transform transition-transform duration-300 ease-out ${
						isOpen ? 'rotate-90' : 'rotate-0'
					}`}
				/>
			</Link>

			<div
				className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-all duration-300 ease-out transform ${
					isOpen
						? 'opacity-100 scale-100 translate-y-0 visible'
						: 'opacity-0 scale-80 -translate-x-2 -translate-y-5 invisible'
				}`}
			>
				<ul className='py-2'>
					{categories.length ? (
						categories.map((category, index) => (
							<li
								key={index}
								className='px-4 py-2 hover:text-accent cursor-pointer transition-colors'
							>
								<Link href=''>{category.name}</Link>
								
							</li>
						))
					) : (
						<li className='px-4 py-2'>Загрузка...</li>
					)}
				</ul>
			</div>
		</div>
	)
}

export default CatalogDropdown
