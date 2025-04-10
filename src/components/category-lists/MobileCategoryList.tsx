import { ICategory } from '@/types/Interfaces'
import { useState } from 'react'
import { CategoryItem } from './CategoryItem'

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
	const [mobileOpenCategory, setMobileOpenCategory] = useState<number | null>(null)


	const getSubcategories = (parentId: number) =>
		categories.filter(category => category.ParentCategoryId === parentId)

	return (
		<ul className={`flex flex-col ${className}`}>
			{categories
				.filter(category => category.ParentCategoryId === 0)
				.map(category => (
					<CategoryItem
						key={category.id}
						category={category}
						subcategories={getSubcategories(category.id)}
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
