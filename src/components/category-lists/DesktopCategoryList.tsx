import { ICategory, ICategoryListProps } from '@/types/Interfaces'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
	categories: ICategory[]
	className?: string
	isFooter?: boolean
}

export default function DesktopCategoryList({
	categories,
	className,
	isFooter,
}: Props) {
	const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

	const footer: string = 'li-hover'
	const nav: string =
		'block px-3 py-1.5 md:px-4 md:py-2 hover:text-accent cursor-pointer transition-colors'

	const getSubcategories = (parentId: number) =>
		categories.filter(category => category.ParentCategoryId === parentId)

	return (
		<ul className={`flex flex-col ${className}`}>
			{categories
				.filter(category => category.ParentCategoryId === 0)
				.map(category => {
					const subcategories = getSubcategories(category.id)
					const hasSubcategories = subcategories.length > 0
					const isHovered = hoveredCategory === category.id

					return (
						<li
							key={category.id}
							onMouseEnter={() => setHoveredCategory(category.id)}
							onMouseLeave={() => setHoveredCategory(null)}
							className='relative'
						>
							<Link
								href={`/catalog/${category.slug}`}
								className={`flex items-center justify-between py-2 hover:text-accent transition-colors ${
									isFooter ? footer : nav
								}`}
							>
								{category.name}
								{!isFooter && hasSubcategories && (
									<ChevronRight
										className={`transition-all duration-300 ease-out ${
											isHovered ? 'rotate-90' : ''
										}`}
									/>
								)}
							</Link>

							{/* Subcategories */}
							{!isFooter && hasSubcategories && (
								<div
									className={`absolute left-full top-0 ml-4 bg-white shadow-lg rounded-md p-2 transition-all duration-300 ease-out
										${
											isHovered
												? 'opacity-100 translate-x-0 scale-100'
												: 'opacity-0 -translate-x-6 scale-80'
										}
										before:absolute before:-left-4 before:top-0 before:w-4 before:h-full before:bg-transparent`}
								>
									<ul>
										{subcategories.map(sub => (
											<li key={sub.id}>
												<Link
													href={`/catalog/${sub.slug}`}
													className='block px-3 py-2 hover:text-accent transition-colors'
												>
													{sub.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							)}
						</li>
					)
				})}
		</ul>
	)
}
