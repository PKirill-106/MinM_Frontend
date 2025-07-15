'use client'
import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/UI/select'
import { ICreateProductVariant } from '@/types/Interfaces'
import dynamic from 'next/dynamic'
import { IProductForm } from '../../interface'
import ColorSelector from './ColorSelector'
import Variant from './Variant'

const ReactQuill = dynamic(() => import('react-quill-new'), {
	ssr: false,
	loading: () => <p>Loading editor...</p>,
})

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
	colors,
	selectedColors,
	setSelectedColors,
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
			{subcategories.length > 0 && parentCatId ? (
				<>
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
									: categoryId
									? categories.find(c => c.id === categoryId)?.name
									: 'Оберіть категорію'}
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
			) : (
				<>
					<span className='mb-2'>Категорія</span>
					<Select
						value={categoryId}
						onValueChange={val => {
							setParentCatId(val)
							setCategoryId(val)
						}}
					>
						<SelectTrigger>
							<SelectValue>
								{categoryId
									? categories.find(c => c.id === categoryId)?.name
									: 'Оберіть категорію'}
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
				</>
			)}

			<div className='mt-4'>
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
					<Variant
						key={idx}
						v={v}
						idx={idx}
						updateVariant={updateVariant}
						removeVariant={removeVariant}
						variants={variants}
					/>
				))}
			</div>

			<ColorSelector
				colors={colors}
				selectedColors={selectedColors}
				setSelectedColors={setSelectedColors}
			/>
		</div>
	)
}
