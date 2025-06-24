import {
	ICategory,
	ICreateProduct,
	IProduct,
	IUpdateProduct,
} from '@/types/Interfaces'

export interface IProductModal {
	type: 'create' | 'update'
	isOpen: boolean
	onClose: () => void
	onSubmit: (formData: FormData, token: string) => Promise<void>
	productData?: IProduct
	categories: ICategory[]
	accessToken: string
}
export interface ICategoryModal {
	type: 'create' | 'update'
	isOpen: boolean
	onClose: () => void
	onSubmit: () => void
	categoryId?: string
}
