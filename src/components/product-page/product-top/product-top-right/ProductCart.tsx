'use client'
import FavoriteButton from '@/components/FavoriteButton'
import Button from '@/components/UI/MyButton'
import { IProductCart } from '../../interfaces'
import Quantity from './Quantity'
import { useState } from 'react'
import { useCart } from '@/providers/CartProvider'

export default function ProductCart({
	amount,
	productId,
	variantId,
}: IProductCart) {
	const { addToCart } = useCart()
	const [quantity, setQuantity] = useState(1)

	const handleAddToCart = async () => {
		if (!variantId) return
		await addToCart(productId, variantId, quantity)
	}

	return (
		<div className='flex flex-col md:flex-row items-center gap-2 lg:gap-4 w-full md:w-auto'>
			<Quantity quantity={quantity} amount={amount} onChange={setQuantity} />

			<Button text='В КОШИК' variant='cart' onClick={handleAddToCart} />

			<div className='relative hidden md:flex'>
				<FavoriteButton
					productId={productId}
					heartClassName='link-size link-hover cursor-pointer'
					buttonClassName='hidden md:flex'
				/>
			</div>
		</div>
	)
}
