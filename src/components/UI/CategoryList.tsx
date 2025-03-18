'use client'
import useCategories from '@/hooks/useCategories'
import { CategoryListProps } from '@/types/Interfaces'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

export default function CategoryList({
	className,
	isFooter,
}: CategoryListProps) {
	const { categories, loading, error } = useCategories()
	const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

	const footer: string = 'li-hover'
	const nav: string =
		'block px-3 py-1.5 md:px-4 md:py-2 hover:text-accent cursor-pointer transition-colors'

	const getSubcategories = (parentId: number) =>
		categories.filter(category => category.ParentCategoryId === parentId)

	return (
		<div className='flex flex-col'>
			<ul className={className}>
				{loading ? (
					<li className='px-4 py-2'>Загрузка...</li>
				) : error ? (
					<li className='px-4 py-2 text-red-500'>{error}</li>
				) : categories.length ? (
					categories
						.filter(c => c.ParentCategoryId === 0)
						.map(category => (
							<li
								key={category.id}
								onMouseEnter={() => setHoveredCategory(category.id)}
								onMouseLeave={() => setHoveredCategory(null)}
								className='relative justify-between'
							>
								<Link
									href={`/catalog/${category.slug}`}
									className={`${
										isFooter ? footer : nav
									} flex items-center justify-between`}
								>
									<span>{category.name}</span>
									{!isFooter && getSubcategories(category.id).length > 0 && (
										<ChevronRight
											className={`h-5 w-5 transition-transform duration-300 ${
												hoveredCategory === category.id ? 'rotate-90' : ''
											}`}
										/>
									)}
								</Link>

								{!isFooter && getSubcategories(category.id).length > 0 && (
									<div
										className={`absolute left-full top-0 ml-4 bg-white shadow-lg rounded-md p-2 transition-all duration-300 ease-out transform 
											${
												hoveredCategory === category.id
													? 'opacity-100 translate-x-0  scale-100 visible'
													: 'opacity-0 -translate-x-6 scale-80 invisible'
											} before:absolute before:-left-4 before:top-0 before:w-4 before:h-full before:bg-transparent`}
									>
										<ul>
											{hoveredCategory &&
												getSubcategories(hoveredCategory).map(sub => (
													<li key={sub.id}>
														<Link
															href={`/catalog/${sub.slug}`}
															className='flex flex-col p-2 hover:text-accent transition-colors'
														>
															{sub.name}
														</Link>
													</li>
												))}
										</ul>
									</div>
								)}
							</li>
						))
				) : (
					<li className='px-4 py-2'>Категорії не знайдені</li>
				)}
			</ul>
		</div>
	)
}
