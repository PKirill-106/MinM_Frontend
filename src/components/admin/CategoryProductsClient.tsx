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
import CategoryModal from './category-modal/CategoryModal'

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
				<div>
					<h1 className='mb-6'>Підкатегорії {activeCategory?.name}</h1>
					<ul className='space-y-2 w-full max-w-md'>
						{subcategories.map(cat => (
							<li key={cat.id} className='w-full flex items-center'>
								<Link href={`/admin/products/${cat.slug}`} className='flex-1'>
									<div className='flex justify-between p-4 w-full border-1 border-transparent-text rounded-md hover:text-accent group'>
										{cat.name}
										<ArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
									</div>
								</Link>
								<Button
									variant='outline'
									size='icon'
									className='text-accent hover:bg-muted ml-4 p-2 rounded-sm'
									onClick={() => openEditCategory(cat)}
									title='Редагувати категорію'
								>
									<Pencil size={18} />
								</Button>
								<AlertOnDelete
									onClick={() => handleDeleteCategory(cat.id, accessToken)}
									name={cat.name}
									setDeleteOption={setDeleteOption}
								/>
							</li>
						))}
					</ul>

					<Button
						className='mt-4 w-full max-w-md rounded-md'
						onClick={openCreateCategory}
					>
						+
					</Button>
				</div>
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
							{products.map(p => {
								const imgSrc = p.productImages?.[0]?.filePath
								const validSrc =
									imgSrc &&
									(imgSrc.startsWith('http://') ||
										imgSrc.startsWith('https://'))
										? imgSrc
										: '/prod/product-image-unavailable.png'

								return (
									<li key={p.id}>
										<div className='flex items-center'>
											<div className='flex p-4 w-full max-w-md border-1 border-transparent-text rounded-md'>
												<div className='relative aspect-square w-20 h-20 mr-4'>
													<Image
														src={validSrc}
														alt={p.name}
														fill
														className='object-cover rounded-sm'
													/>
												</div>
												<div className='w-full flex flex-col justify-between'>
													<span>{p.name}</span>
													<div className='flex items-center justify-between gap-2'>
														<span className='text-transparent-text'>
															{p.sku}
														</span>
														<Button
															variant='link'
															onClick={() => openEditProduct(p)}
														>
															Редагувати
														</Button>
													</div>
												</div>
											</div>

											<AlertOnDelete
												onClick={() =>
													handleDeleteProduct({ id: p.id }, accessToken)
												}
												name={p.name}
											/>
										</div>
									</li>
								)
							})}
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
