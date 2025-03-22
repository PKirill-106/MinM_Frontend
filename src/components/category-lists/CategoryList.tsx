'use client'
import useCategories from '@/hooks/useCategories'
import { ICategoryListProps } from '@/types/Interfaces'
import DesktopCategoryList from './DesktopCategoryList'
import MobileCategoryList from './MobileCategoryList'

export default function CategoryList({
	className,
	isFooter,
}: ICategoryListProps) {
	const { categories, loading, error } = useCategories()

	if (loading) return <p>Загрузка...</p>
	if (error) return <p className='text-red-500'>{error}</p>
	if (!categories.length) return <p>Категорії не знайдені</p>

	return (
		<div className={className}>
			{/* Render different components based on screen size */}
			<div className='hidden md:block'>
				<DesktopCategoryList categories={categories} isFooter={isFooter} />
			</div>
			<div className='md:hidden'>
				<MobileCategoryList categories={categories} isFooter={isFooter} />
			</div>
		</div>
	)
}
