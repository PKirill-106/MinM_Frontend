import CartList from '@/components/cart/CartList'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import React from 'react'

export default async function CartPage() {
	const products = await getAllProducts()
	const categories = await getAllCategories()

	return (
		<div className='container'>
			<h2 className='mb-2 md:mb-3 lg:mb-4'>Кошик</h2>
			<CartList products={products} categories={categories} />
		</div>
	)
}
