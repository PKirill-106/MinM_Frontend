import {
	ICategory,
	ICreateCategory,
	ICreateProductVariant,
	IProduct,
	IProductImage,
	IUpdateCategory,
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
	setVariants: (v: ICreateProductVariant[]) => void
	modules?: any
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
	onSubmit: (
		categoryData: ICreateCategory | IUpdateCategory,
		token: string
	) => void
	accessToken: string
	categoryData?: ICategory
	categories: ICategory[]
}
export interface IAlertOnDelete {
	onClick: () => void
	pName: string
}
