import {
	ICategory,
	ICreateProductVariant,
	IProduct,
	IProductColor,
	IProductImage,
} from '@/types/Interfaces'
import { DragEndEvent } from '@dnd-kit/core'
import { RefObject } from 'react'

export interface IProductModal {
	type: 'create' | 'update'
	isOpen: boolean
	onClose: () => void
	onSubmit: (formData: FormData, token: string) => Promise<void>
	productData?: IProduct
	activeCategory: ICategory
	categories: ICategory[]
	accessToken: string
	colors: IProductColor[]
}
export interface IProductForm {
	name: string
	setName: (val: string) => void
	sku: string
	setSku: (val: string) => void
	descriptionDelta: string | any
	setDescriptionDelta: (val: string | any) => void
	parentCatId: string
	setParentCatId: (val: string) => void
	categoryId: string
	setCategoryId: (val: string) => void
	categories: ICategory[]
	subcategories: ICategory[]
	variants: ICreateProductVariant[]
	setVariants: (val: ICreateProductVariant[]) => void
	modules?: any
	colors: IProductColor[]
	selectedColors: IProductColor[]
	setSelectedColors: (colors: IProductColor[]) => void
}
export interface ISortableImage {
	file: IProductImage
	onRemove: () => void
}
export interface IImageUploader {
	images: IProductImage[]
	setImages: (images: IProductImage[]) => void
	onDragEnd: (event: DragEndEvent) => void
	onRemove: (filePath: string) => void
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	fileInputRef: RefObject<HTMLInputElement | null>
	sensors: any
}
export interface ICategoryModal {
	type: 'create' | 'update'
	isOpen: boolean
	onClose: () => void
	onSubmit: (formData: FormData, token: string) => void
	accessToken: string
	categoryData?: ICategory
	activeCategory: ICategory
	categories: ICategory[]
}
export interface IAlertOnDelete {
	onClick: () => void
	name: string
	setDeleteOption?: (
		option: 'CascadeDelete' | 'ReassignToParent' | 'Orphan'
	) => void
}
