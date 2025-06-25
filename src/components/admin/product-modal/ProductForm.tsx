'use client'
import React, { useMemo } from 'react'
import { IProductForm } from '../interface'
import { ICreateProductVariant } from '@/types/Interfaces'
import ReactQuill from 'react-quill-new'
import { Input } from '@/components/UI/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select'
import { Button } from '@/components/UI/button'
import { X } from 'lucide-react'

export default function ProductForm({
	name,
	setName,
	sku,
	setSku,
	descriptionDelta,
	setDescriptionDelta,
	parentCatId,
	setParentCatId,
	categoryId,
	setCategoryId,
	categories,
	subcategories,
	variants,
	setVariants,
	modules,
}: IProductForm) {
  const addVariant = () =>
		setVariants([...variants, { name: '', price: 0, unitsInStock: 0 }])

	const removeVariant = (index: number) =>
		setVariants(variants.filter((_, i) => i !== index))

	const updateVariant = (
		index: number,
		field: keyof ICreateProductVariant,
		value: string | number
	) => {
		const updated = variants.map((v, i) =>
			i === index
				? {
						...v,
						[field]: field === 'name' ? (value as string) : Number(value),
				  }
				: v
		)
		setVariants(updated)
	}

	return (
		<div>
			<span className='mb-2'>Назва продукту</span>
			<Input
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Назва продукту'
				required
			/>

			<span className='mb-2'>Опис продукту</span>
			<ReactQuill
				theme='snow'
				value={descriptionDelta}
				onChange={setDescriptionDelta}
				modules={modules}
			/>

			<span className='mb-2'>Артикул</span>
			<Input
				value={sku}
				onChange={e => setSku(e.target.value)}
				placeholder='SKU'
				required
			/>

			<span className='mb-2'>Категорія</span>
			<Select
				value={parentCatId}
				onValueChange={val => {
					setParentCatId(val)
					setCategoryId(val)
				}}
			>
				<SelectTrigger>
					<SelectValue>
						{parentCatId
							? categories.find(c => c.id === parentCatId)?.name
							: 'Оберіть підкатегорію'}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{categories
							.filter(c => c.parentCategoryId === null)
							.map(c => (
								<SelectItem key={c.id} value={c.id}>
									{c.name}
								</SelectItem>
							))}
					</SelectGroup>
				</SelectContent>
			</Select>

			{subcategories.length > 0 && parentCatId && (
				<>
					<span>Підкатегорія</span>
					<Select value={categoryId} onValueChange={setCategoryId}>
						<SelectTrigger>
							<SelectValue>
								{categoryId
									? categories.find(c => c.id === categoryId)?.name
									: 'Оберіть підкатегорію'}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{subcategories.map(c => (
									<SelectItem key={c.id} value={c.id}>
										{c.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</>
			)}

			<div>
				<div className='flex justify-between items-center'>
					<label>Варіанти:</label>
					<Button
						variant='outline'
						size='sm'
						type='button'
						onClick={addVariant}
					>
						+ Варіант
					</Button>
				</div>
				{variants.map((v, idx) => (
					<div
						key={idx}
						className='flex gap-2 justify-between items-center my-2'
					>
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
								onChange={e =>
									updateVariant(idx, 'unitsInStock', e.target.value)
								}
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
				))}
			</div>
		</div>
	)
}
