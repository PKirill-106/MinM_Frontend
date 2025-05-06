import React from 'react'
import FilterCheckboxGroup from './FilterCheckboxGroup'
import { IProductFilters } from '@/types/Interfaces'
import FilterSelectGroup from './FilterSelectGroup'

export default function ProductFilters({
	categories,
	activeCategory,
	activeSubcategory,
}: IProductFilters) {
	return (
		<div className='mb-6'>
			<FilterCheckboxGroup />
			<FilterSelectGroup
				categories={categories}
				activeCategory={activeCategory}
				activeSubcategory={activeSubcategory}
			/>
		</div>
	)
}
