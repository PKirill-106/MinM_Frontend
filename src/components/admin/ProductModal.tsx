'use client'

import Modal from '@/components/UI/Modal'
import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import { ICreateProductVariant, IProductImage } from '@/types/Interfaces'
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef, useState } from 'react'
import 'react-quill-new/dist/quill.snow.css'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../UI/select'
import { IProductModal } from './interface'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
type Delta = any

export default function ProductModal({
	type,
	isOpen,
	onClose,
	onSubmit,
	productData,
	categories,
	accessToken,
}: IProductModal) {
	const isUpdate = type === 'update'

	const [name, setName] = useState('')
	const [descriptionDelta, setDescriptionDelta] = useState<string | Delta>('')
	const [sku, setSku] = useState('')
	const [parentCatId, setParentCatId] = useState('')
	const [categoryId, setCategoryId] = useState('')
	const [variants, setVariants] = useState<ICreateProductVariant[]>([
		{ name: '', price: 0, unitsInStock: 0 },
	])
	const [images, setImages] = useState<IProductImage[]>([])
	const fileInputRef = useRef<HTMLInputElement>(null)

	const subcategories = categories.filter(
		c => c.parentCategoryId === parentCatId
	)

	useEffect(() => {
		if (isUpdate && productData) {
			setName(productData.name)
			try {
				const parsed = JSON.parse(productData.description)
				setDescriptionDelta(parsed)
			} catch {
				setDescriptionDelta(productData.description)
			}

			setSku(productData.sku)
			const prodCat = categories.find(c => c.id === productData.categoryId)
			if (prodCat) {
				setCategoryId(prodCat.id)
				setParentCatId(prodCat.parentCategoryId || prodCat.id)
			}
			setVariants(productData.productVariants as ICreateProductVariant[])
			setImages(productData.productImages)
		} else {
			setName('')
			setDescriptionDelta('')
			setSku('')
			setVariants([{ name: '', price: 0, unitsInStock: 0 }])
			setImages([])
		}
	}, [isUpdate, productData, isOpen])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files)
			const newImageObjects: IProductImage[] = files.map(file => ({
				filePath: URL.createObjectURL(file),
				file,
			}))
			setImages(prev => [...prev, ...newImageObjects])
			e.target.value = ''
		}
	}

	const sensors = useSensors(useSensor(PointerSensor))
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return
		const oldIndex = images.findIndex(i => i.filePath === active.id)
		const newIndex = images.findIndex(i => i.filePath === over.id)
		if (oldIndex !== -1 && newIndex !== -1) {
			setImages(arrayMove(images, oldIndex, newIndex))
		}
	}

	const removeImage = (filePath: string) => {
		setImages(prev => prev.filter(i => i.filePath !== filePath))
	}

	const addVariant = () => {
		setVariants(prev => [...prev, { name: '', price: 0, unitsInStock: 0 }])
	}

	const removeVariant = (index: number) => {
		setVariants(prev => prev.filter((_, i) => i !== index))
	}

	const updateVariant = (
		index: number,
		field: keyof ICreateProductVariant,
		value: string | number
	) => {
		setVariants(prev =>
			prev.map((v, i) => {
				if (i !== index) return v
				return {
					...v,
					[field]: field === 'name' ? (value as string) : Number(value),
				}
			})
		)
	}

	const handleSubmit = () => {
		const formData = new FormData()

		// Общие поля
		formData.append('Name', name)
		formData.append(
			'Description',
			typeof descriptionDelta === 'string'
				? descriptionDelta
				: JSON.stringify(descriptionDelta)
		)
		formData.append('CategoryId', categoryId)
		formData.append('SKU', sku)
		formData.append('ProductVariantsJson', JSON.stringify(variants))

		// Для обновления
		if (isUpdate && productData?.id) {
			formData.append('Id', productData.id)
		}

		// Обработка изображений
		images.forEach(img => {
			if ('file' in img && img.file instanceof File) {
				formData.append('NewImages', img.file)
			} else {
				formData.append('ExistingImageUrls', img.filePath)
			}
		})

		onSubmit(formData, accessToken)
	}

	const modules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, false] }],
				['bold', 'italic', 'underline'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				['link', 'image'],
			],
		}),
		[]
	)

	const isValid = name && sku && categoryId && variants.length > 0

	return (
		<Modal isOpen={isOpen} onClose={onClose} isInput={true}>
			<div className='space-y-4 p-6 bg-white rounded shadow-lg w-full max-h-[80vh] overflow-y-auto'>
				<h2 className='text-xl font-semibold'>
					{isUpdate ? 'Редагувати продукт' : 'Додати продукт'}
				</h2>

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

				<div>
					<span className='block mb-2'>Зображення продукту</span>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={images.map(i => i.filePath)}
							strategy={verticalListSortingStrategy}
						>
							<div className='flex gap-2 overflow-x-auto py-2'>
								{images.map(img => (
									<SortableImage
										key={img.filePath}
										file={img}
										onRemove={() => removeImage(img.filePath)}
									/>
								))}
							</div>
						</SortableContext>
					</DndContext>
					<div className='mt-4'>
						<Button
							variant='outline'
							size='sm'
							type='button'
							onClick={() => fileInputRef.current?.click()}
						>
							+ Додати зображення
						</Button>
						<input
							ref={fileInputRef}
							type='file'
							accept='image/*'
							multiple
							onChange={handleFileChange}
							className='hidden'
						/>
					</div>
				</div>

				<div className='flex justify-end gap-2 pt-4'>
					<Button variant='outline' type='button' onClick={onClose}>
						Скасувати
					</Button>
					<Button type='button' disabled={!isValid} onClick={handleSubmit}>
						{isUpdate ? 'Зберегти' : 'Створити'}
					</Button>
				</div>
			</div>
		</Modal>
	)
}

function SortableImage({
	file,
	onRemove,
}: {
	file: IProductImage
	onRemove: () => void
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: file.filePath })
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}
	return (
		<div
			ref={setNodeRef}
			style={style}
			className='relative w-24 h-24 rounded overflow-hidden'
		>
			<img src={file.filePath} className='w-full h-full object-cover' alt='' />
			<button
				onClick={onRemove}
				className='absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white'
			>
				<X size={12} />
			</button>
			<div
				{...attributes}
				{...listeners}
				className='absolute bottom-1 left-1 bg-white bg-opacity-50 rounded p-1 cursor-grab'
			>
				⋮
			</div>
		</div>
	)
}
