'use client'

import { ICategoryList } from '@/types/Interfaces'
import { useState } from 'react'
import { CategoryItem } from './CategoryItem'

export default function DesktopCategoryList({
	categories,
	className,
	isFooter,
}: ICategoryList) {
	const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(
		null
	)

	if (!categories || categories.length === 0) return null

	return (
		<ul className={`flex flex-col ${className}`}>
			{categories
				.filter(category => category.parentCategoryId === null)
				.map(category => (
					<CategoryItem
						key={category.id}
						category={category}
						subcategories={category.subCategories ?? []}
						isFooter={isFooter}
						isMobile
						isOpen={mobileOpenCategory === category.id}
						onToggle={e => {
							e.preventDefault()
							setMobileOpenCategory(prev =>
								prev === category.id ? null : category.id
							)
						}}
					/>
				))}
		</ul>
	)
}
