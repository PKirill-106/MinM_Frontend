'use client'
import { Button } from '@/components/UI/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/UI/dialog'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/UI/dropdown-menu'
import { Input } from '@/components/UI/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/UI/select'
import { ICreateProductVariant, IProductColor } from '@/types/Interfaces'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { IProductForm } from '../interface'

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
	const [newColor, setNewColor] = useState<IProductColor>({
		name: '',
		colorHex: '#000000',
	})

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

	const addColor = () => {
		if (
			newColor.name.trim() &&
			!selectedColors.some(c => c.colorHex === newColor.colorHex)
		) {
			setSelectedColors([...selectedColors, newColor])
			setNewColor({ name: '', colorHex: '#000000' })
		}
	}

	const removeColor = (index: number) => {
		setSelectedColors(selectedColors.filter((_, i) => i !== index))
	}

	const toggleColor = (color: IProductColor) => {
		if (selectedColors.some(c => c.colorHex === color.colorHex)) {
			setSelectedColors(
				selectedColors.filter(c => c.colorHex !== color.colorHex)
			)
		} else {
			setSelectedColors([...selectedColors, color])
		}
	}

	const updateNewColor = (field: keyof IProductColor, value: string) => {
		setNewColor(prev => ({ ...prev, [field]: value }))
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

			<div className='mt-6 space-y-4'>
				<div className='flex items-center justify-between'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm'>
								Оберіть колір
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='max-h-60 overflow-y-auto w-56'>
							{colors.length > 0 ? (
								colors.map(color => {
									const isSelected = selectedColors.some(
										selected => selected.colorHex === color.colorHex
									)

									return (
										<DropdownMenuCheckboxItem
											key={color.colorHex}
											checked={isSelected}
											onCheckedChange={() => toggleColor(color)}
											className='flex items-center gap-2'
										>
											<div
												className='w-4 h-4 rounded-full border'
												style={{ backgroundColor: color.colorHex }}
											/>
											<span>{color.name}</span>
										</DropdownMenuCheckboxItem>
									)
								})
							) : (
								<p className='px-2 py-1 text-sm text-muted-foreground'>
									Кольори не знайдено
								</p>
							)}
						</DropdownMenuContent>
					</DropdownMenu>

					<Dialog>
						<DialogTrigger asChild>
							<Button variant='outline' size='sm'>
								+ Додати
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Новий колір</DialogTitle>
							</DialogHeader>
							<div className='flex flex-col gap-4'>
								<Input
									value={newColor.name}
									onChange={e => updateNewColor('name', e.target.value)}
									placeholder='Назва нового кольору'
								/>
								<input
									type='color'
									value={newColor.colorHex}
									onChange={e => updateNewColor('colorHex', e.target.value)}
									className='h-10 w-20 rounded border self-start'
								/>
								<Button onClick={addColor}>Додати</Button>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				{/* Выбранные цвета */}
				{selectedColors.length > 0 && (
					<div className='flex flex-wrap gap-2'>
						{selectedColors.map((color, idx) => (
							<div
								key={idx}
								className='flex items-center gap-2 px-2 py-1 rounded-full border text-sm'
							>
								<div
									className='w-4 h-4 rounded-full border'
									style={{ backgroundColor: color.colorHex }}
								/>
								<span>{color.name}</span>
								<Button
									size='icon'
									variant='ghost'
									onClick={() => removeColor(idx)}
								>
									<X className='w-4 h-4' />
								</Button>
							</div>
						))}
					</div>
				)}

				{selectedColors.length === 0 && (
					<p className='text-muted-foreground text-sm'>Кольори не вибрані</p>
				)}
			</div>
		</div>
	)
}
