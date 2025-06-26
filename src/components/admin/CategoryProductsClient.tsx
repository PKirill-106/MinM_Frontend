'use client'

import { Button } from '@/components/UI/button'
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
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import AlertOnDelete from './AlertOnDelete'
import ProductModal from './product-modal/ProductModal'

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
	const [isModalOpen, setModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)

	const openCreate = () => {
		setModalType('create')
		setEditingProduct(null)
		setModalOpen(true)
	}

	const openEdit = (prod: IProduct) => {
		setModalType('update')
		setEditingProduct(prod)
		setModalOpen(true)
	}

	const closeModal = () => setModalOpen(false)

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
				setModalOpen(false)
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

	return (
		<div>
			{subcategories.length ? (
				<div>
					<h1 className='mb-10'>Підкатегорії {activeCategory?.name}</h1>

					<div className='flex flex-col items-center max-w-xs'>
						<ul className='space-y-2 w-full'>
							{subcategories.map(cat => (
								<li key={cat.id}>
									<Link href={`/admin/products/${cat.slug}`}>
										<div className='flex justify-between p-4 w-full max-w-md border-1 border-transparent-text rounded-md hover:text-accent group'>
											{cat.name}
											<ArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
										</div>
									</Link>
								</li>
							))}
						</ul>

						<Button className='mt-4 rounded-full'>+</Button>
					</div>
				</div>
			) : (
				<div>
					<h1 className='mb-10'>Продукти категорії {activeCategory?.name}</h1>

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
														<Button variant='link' onClick={() => openEdit(p)}>
															Редагувати
														</Button>
													</div>
												</div>
											</div>

											<AlertOnDelete
												onClick={() =>
													handleDeleteProduct({ id: p.id }, accessToken)
												}
												pName={p.name}
											/>
										</div>
									</li>
								)
							})}
						</ul>
						<Button className='mt-4 rounded-full' onClick={openCreate}>
							+
						</Button>
					</div>
				</div>
			)}

			<ProductModal
				type={modalType}
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={handleSubmitProduct}
				productData={editingProduct || undefined}
				activeCategory={activeCategory}
				categories={categories}
				accessToken={accessToken}
				colors={colors}
			/>
		</div>
	)
}
