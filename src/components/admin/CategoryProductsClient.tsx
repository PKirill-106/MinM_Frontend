'use client'

import { Button } from '@/components/UI/button'
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/lib/services/categoryServices'
import {
	createProduct,
	deleteProduct,
	updateProduct,
} from '@/lib/services/productServices'
import {
	ICategory,
	IDeleteProduct,
	IProduct,
	IProductColor,
} from '@/types/Interfaces'
import { ArrowRight, Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import AlertOnDelete from './AlertOnDelete'
import ProductModal from './product-modal/ProductModal'
import CategoryModal from './category/CategoryModal'
import Subcategory from './category/Subcategory'
import Product from './category/Product'

interface Props {
	activeCategory: ICategory
	products: IProduct[]
	categories: ICategory[]
	subcategories: ICategory[]
	colors: IProductColor[]
}

export default function CategoryProductsClient({
	activeCategory,
	products,
	categories,
	subcategories,
	colors,
}: Props) {
	const [isProductModalOpen, setProductModalOpen] = useState(false)
	const [isCategoryModalOpen, setCategoryModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)
	const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
	const [deleteOption, setDeleteOption] = useState<
		'CascadeDelete' | 'ReassignToParent' | 'Orphan' | null
	>(null)

	// ---------- PRODUCT ----------

	const openCreateProduct = () => {
		setModalType('create')
		setEditingProduct(null)
		setProductModalOpen(true)
	}

	const openEditProduct = (prod: IProduct) => {
		setModalType('update')
		setEditingProduct(prod)
		setProductModalOpen(true)
	}

	const { data: session } = useSession()
	const accessToken = (session as any)?.accessToken as string

	const handleSubmitProduct = useCallback(
		async (formData: FormData, token: string) => {
			if (!token) {
				console.error('No access token available')
				return
			}

			try {
				if (modalType === 'create') {
					await createProduct(formData, token, activeCategory?.slug)
				} else {
					await updateProduct(formData, token, activeCategory?.slug)
				}
				setProductModalOpen(false)
				toast.success(
					`Продукт ${modalType === 'create' ? 'створено' : 'оновлено'}`
				)
			} catch (err) {
				toast.error('Сталася помилка')
				console.error('Submit failed:', err)
			}
		},
		[modalType]
	)

	const handleDeleteProduct = async (
		productId: IDeleteProduct,
		token: string
	) => {
		try {
			await deleteProduct(productId, token, activeCategory?.slug)
			toast.success('Продукт видалено')
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('Delete failed:', err)
		}
	}

	// ---------- CATEGORY ----------

	const openCreateCategory = () => {
		setModalType('create')
		setEditingCategory(null)
		setCategoryModalOpen(true)
	}

	const openEditCategory = (cat: ICategory) => {
		setModalType('update')
		setEditingCategory(cat)
		setCategoryModalOpen(true)
	}

	const handleSubmitCategory = useCallback(
		async (formData: FormData, token: string) => {
			if (!token) {
				console.error('No access token available')
				return
			}
			try {
				if (modalType === 'create') {
					await createCategory(formData, token)
				} else {
					await updateCategory(formData, token)
				}
				setCategoryModalOpen(false)
				toast.success(
					`Категорію ${modalType === 'create' ? 'створено' : 'оновлено'}`
				)
			} catch (err) {
				toast.error('Сталася помилка')
				console.error('Submit failed:', err)
			}
		},
		[modalType]
	)

	const handleDeleteCategory = async (categoryId: string, token: string) => {
		try {
			const payload = {
				categoryId,
				option: deleteOption ?? 'CascadeDelete',
			}
			await deleteCategory(payload, token)
			toast.success('Категорію видалено')
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('Delete failed:', err)
		}
	}

	return (
		<div>
			{subcategories.length ? (
				<Subcategory
					parentCategoryName={activeCategory?.name}
					subcategories={subcategories}
					editCat={openEditCategory}
					createCat={openCreateCategory}
					deleteCat={handleDeleteCategory}
					setDeleteOption={setDeleteOption}
					accessToken={accessToken}
				/>
			) : (
				<div>
					<h1 className='mb-10'>Продукти категорії {activeCategory?.name}</h1>
					{products.length === 0 ? (
						<div className='flex items-center gap-4 mb-8'>
							<Button onClick={openCreateCategory}>
								Створити підкатегорію
							</Button>
							<Button onClick={openCreateProduct}>Створити продукт</Button>
						</div>
					) : (
						<div className='flex items-center gap-4 mb-8'>
							<Button onClick={openCreateProduct}>Створити продукт</Button>
						</div>
					)}

					<div className='grid-cols-2 items-center'>
						<ul className='space-y-2 w-full'>
							{products.map(p => (
								<Product
									key={p.id}
									product={p}
									onEdit={openEditProduct}
									onDelete={handleDeleteProduct}
									accessToken={accessToken}
								/>
							))}
						</ul>
						<Button className='mt-4 rounded-full' onClick={openCreateProduct}>
							+
						</Button>
					</div>
				</div>
			)}

			<ProductModal
				type={modalType}
				isOpen={isProductModalOpen}
				onClose={() => setProductModalOpen(false)}
				onSubmit={handleSubmitProduct}
				productData={editingProduct || undefined}
				activeCategory={activeCategory}
				categories={categories}
				accessToken={accessToken}
				colors={colors}
			/>
			<CategoryModal
				type={modalType}
				isOpen={isCategoryModalOpen}
				onClose={() => setCategoryModalOpen(false)}
				onSubmit={handleSubmitCategory}
				accessToken={accessToken}
				categoryData={editingCategory || undefined}
				activeCategory={activeCategory}
				categories={categories}
			/>
		</div>
	)
}
