'use client'
import Select from '@/components/UI/MySelect'
import { IFilterSelectGroup } from '@/types/Interfaces'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { slugify } from 'transliteration'

export default function FilterSelectGroup({
	categories,
	activeCategory,
	activeSubcategory,
	colors
}: IFilterSelectGroup) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const currentSort = searchParams.get('sort') || 'suggested'

	const handleSortSelect = (sortId: string) => {
		const currentPath = window.location.pathname
		const url = new URLSearchParams(window.location.search)
		url.set('sort', sortId)
		router.push(`${currentPath}?${url.toString()}`)
	}
	
	const activeCategoryObj = categories.find(
		c => c.parentCategoryId === null && slugify(c.name) === activeCategory
	)

	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
		activeCategoryObj?.id ?? null
	)

	useEffect(() => {
		if (activeCategoryObj) {
			setSelectedCategoryId(activeCategoryObj.id)
		}
	}, [activeCategoryObj?.id])

	const handleCategorySelect = (categoryId: string) => {
		const category = categories.find(c => c.id === categoryId)
		if (category) {
			router.push(`/catalog/${category.slug}`)
		}
	}

	const handleSubcategorySelect = (subcategoryId: string) => {
		const subcat = categories.find(c => c.id === subcategoryId)
		const parent = categories.find(c => c.id === subcat?.parentCategoryId)

		if (subcat && parent) {
			router.push(`/catalog/${parent.slug}/${subcat.slug}`)
		}
	}

	const filteredSubcategories = selectedCategoryId
		? categories.filter(cat => cat.parentCategoryId === selectedCategoryId)
		: []

	return (
		<div className='flex flex-col md:flex-row md:items-center gap-5 mb-6'>
			<Select
				variant='cat'
				options={categories}
				defaultValue='Виберіть категорію'
				onSelect={handleCategorySelect}
				activeSlug={activeCategory}
			/>
			{selectedCategoryId && (
				<Select
					variant='subcat'
					options={filteredSubcategories}
					defaultValue='Виберіть підкатегорію'
					onSelect={handleSubcategorySelect}
					activeSlug={activeSubcategory}
				/>
			)}
			<Select
				variant='color'
				options={colors}
				defaultValue='Колір'
				onSelect={handleSortSelect}
				activeId={currentSort}
			/>
			<div className='md:ml-auto'>
				<Select
					variant='sort'
					options={categories}
					defaultValue='Рекомендовані'
					onSelect={handleSortSelect}
					activeId={currentSort}
				/>
			</div>
		</div>
	)
}
