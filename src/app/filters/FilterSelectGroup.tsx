import Select from '@/components/UI/Select'
import { IFilterSelectGroup } from '@/types/Interfaces'
import React from 'react'

export default function FilterSelectGroup({ categories }: IFilterSelectGroup) {
	return (
		<div className='flex gap-4 mb-6'>
			<Select
				variant='cat'
				options={categories}
				defaultValue='Виберіть категорію'
			/>
			<Select
				variant='subcat'
				options={categories}
				defaultValue='Виберіть підкатегорію'
			/>
			<input type='color' className='color-picker border rounded' />
			<Select variant='sort' options={categories} defaultValue='Від дешевих' />
		</div>
	)
}
