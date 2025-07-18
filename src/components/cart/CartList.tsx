'use client'

import { useCart } from '@/providers/CartProvider'
import { ICartList } from '@/types/Interfaces'
import React from 'react'
import CartItem from './CartItem'

export default function CartList({ products, categories }: ICartList) {
	const { cartProducts } = useCart()

	return (
		<div>
			<div className='flex flex-col gap-6'>
				{cartProducts.map(cartItem => {
					const product = products.find(p => p.id === cartItem.id)
					if (!product) return null
					return (
						<CartItem
							key={`${cartItem.id}-${cartItem.variantId}`}
							product={product}
							cartItem={cartItem}
						/>
					)
				})}
			</div>
		</div>
	)
}
