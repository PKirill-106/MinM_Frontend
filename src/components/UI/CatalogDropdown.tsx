'use client'
import useCategories from '@/hooks/useCategories'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

function CatalogDropdown() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const { categories, loading, error } = useCategories()

	return (
		<div
			ref={dropdownRef}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
			className='relative inline-block	'
		>
			<Link
				href='/catalog'
				className='p-3 text-sm md:p-4 md:text-base lg:p-5 lg:text-lg xl:p-6 xl:text-xl flex gap-1 bg-button items-center text-button-text rounded-md hover:bg-accent hover:text-white-text transition-all duration-300 button-text cursor-pointer'
			>
				<span>Каталог продукції</span>
				<ChevronRight
					className={`h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 transform transition-transform duration-300 ease-out ${
						isOpen ? 'rotate-90' : 'rotate-0'
					}`}
				/>
			</Link>

			<div
				className={`text-xs md:text-sm lg:text-base xl:text-lg absolute block left-0 mt-2  xl:w-60  bg-white shadow-lg rounded-md transition-all duration-300 ease-out transform before:absolute before:-top-2 before:left-0 before:w-full before:h-3 before:bg-transparent ${
					isOpen
						? 'opacity-100 scale-100 translate-y-0 visible'
						: 'opacity-0 scale-80 -translate-x-2 -translate-y-5 invisible'
				}`}
			>
				<ul
					className='py-2 text-sm md:text-base lg:text-lg xl:text-xl'
				>
					{loading ? (
						<li className='px-4 py-2'>Загрузка...</li>
					) : error ? (
						<li className='px-4 py-2 text-red-500'>{error}</li>
					) : categories.length ? (
						categories.map((category, index) => (
							<li key={index}>
								<Link
									href={`/catalog/${category.slug}`}
									className='block px-4 py-2  hover:text-accent cursor-pointer transition-colors'
								>
									{category.name}
								</Link>
							</li>
						))
					) : (
						<li className='px-4 py-2'>Категорії не знайдені</li>
					)}
				</ul>
			</div>
		</div>
	)
}

export default CatalogDropdown
