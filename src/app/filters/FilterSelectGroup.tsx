import Select from '@/components/UI/Select'
import { IFilterSelectGroup } from '@/types/Interfaces'
import React from 'react'

export default function FilterSelectGroup({ categories }: IFilterSelectGroup) {
	return (
		<div className='flex items-center gap-5 mb-6'>
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
			<div className='ml-auto'>
				<Select
					variant='sort'
					options={categories}
					defaultValue='Рекомендовані'
				/>
			</div>
		</div>
	)
}
