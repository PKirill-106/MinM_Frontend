import { ICategory } from '@/types/Interfaces'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
	categories: ICategory[]
	className?: string
	isFooter?: boolean
}

export default function MobileCategoryList({
	categories,
	className,
	isFooter,
}: Props) {
	const [mobileOpenCategory, setMobileOpenCategory] = useState<number | null>(
		null
	)

	const toggleSubcategory = (id: number, event: React.MouseEvent) => {
		event.preventDefault()
		setMobileOpenCategory(prev => (prev === id ? null : id))
	}

	const getSubcategories = (parentId: number) =>
		categories.filter(category => category.ParentCategoryId === parentId)

	return (
		<ul>
			{categories
				.filter(category => category.ParentCategoryId === 0)
				.map(category => {
					const subcategories = getSubcategories(category.id)
					const hasSubcategories = subcategories.length > 0
					const isMobileOpen = mobileOpenCategory === category.id

					return (
						<li key={category.id} className='relative'>
							<div className='flex justify-between items-center'>
								<Link
									href={`/catalog/${category.slug}`}
									className={`block px-3 py-2 flex-grow ${
										isFooter ? 'li-hover' : ''
									}`}
								>
									{category.name}
								</Link>

								{hasSubcategories && (
									<button
										onClick={e => toggleSubcategory(category.id, e)}
										className='flex items-center justify-center w-10'
									>
										<ChevronRight
											className={`h-5 w-5 transition-transform duration-300 ${
												isMobileOpen ? 'rotate-90' : ''
											}`}
										/>
									</button>
								)}
							</div>

							{/* Subcategories */}
							{hasSubcategories && (
								<div
									className={`overflow-hidden transition-all duration-300 ease-out ${
										isMobileOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'
									} flex`}
								>
									<div className='w-px bg-foreground/20 ml-3 py-5'></div>
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
