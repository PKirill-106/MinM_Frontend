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
import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import CategoryModal from './category/CategoryModal'
import Product from './category/Product'
import Subcategory from './category/Subcategory'
import ProductModal from './product-modal/ProductModal'
import { useProductManagement } from '@/hooks/useProductManagement'
import { useCategoryManagement } from '@/hooks/useCategoryManagement'

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
	const { data: session } = useSession()
	const accessToken = (session as any)?.accessToken as string

	const {
		isProductModalOpen,
		modalType: productModalType,
		editingProduct,
		openCreateProduct,
		openEditProduct,
		handleSubmitProduct,
		handleDeleteProduct,
		setProductModalOpen,
	} = useProductManagement(activeCategory?.slug)

	const {
		isCategoryModalOpen,
		modalType: categoryModalType,
		editingCategory,
		openCreateCategory,
		openEditCategory,
		handleSubmitCategory,
		handleDeleteCategory,
		setCategoryModalOpen,
		setDeleteOption,
	} = useCategoryManagement()

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
					</div>
				</div>
			)}

			<ProductModal
				type={productModalType}
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
				type={categoryModalType}
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
