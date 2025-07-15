import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import { ICreateProductVariant } from '@/types/Interfaces'
import { X } from 'lucide-react'
import React from 'react'

export interface IVariant {
	v: ICreateProductVariant
	idx: number
	updateVariant: (
		index: number,
		field: keyof ICreateProductVariant,
		value: string | number
	) => void
	removeVariant: (index: number) => void
	variants: ICreateProductVariant[]
}

export default function Variant({ v, idx, updateVariant, removeVariant, variants }: IVariant) {
	return (
		<div key={idx} className='flex gap-2 justify-between items-center my-2'>
			<div className='basis-1/3'>
				<span className='mb-2'>
					Об'єм<span className='text-transparent-text'>, мл</span>
				</span>
				<Input
					value={v.name}
					onChange={e => updateVariant(idx, 'name', e.target.value)}
					placeholder="Об'єм, мл"
				/>
			</div>
			<div className='basis-1/3'>
				<span className='mb-2'>
					Ціна<span className='text-transparent-text'>, грн</span>
				</span>
				<Input
					type='number'
					value={v.price}
					onChange={e => updateVariant(idx, 'price', e.target.value)}
					placeholder='Ціна'
				/>
			</div>
			<div className='basis-1/3'>
				<span className='mb-2'>Кіль-сть</span>
				<Input
					type='number'
					value={v.unitsInStock}
					onChange={e => updateVariant(idx, 'unitsInStock', e.target.value)}
					placeholder='Кіль-сть на складі'
				/>
			</div>
			{variants.length > 1 && (
				<Button
					variant='outline'
					size='sm'
					type='button'
					onClick={() => removeVariant(idx)}
					className='translate-y-3'
				>
					<X className='link-size' />
				</Button>
			)}
		</div>
	)
}
