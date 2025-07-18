'use client'
import React, { useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../UI/select'
import { ICartItem, IProduct, IProductVariant } from '@/types/Interfaces'
import { useCart } from '@/providers/CartProvider'

export interface ISelectVariant {
	variant: IProductVariant
	cartItem: ICartItem
	product: IProduct
}

export default function SelectVariant({
	variant,
	cartItem,
	product,
}: ISelectVariant) {
	const { updateVariant } = useCart()

	const [selectedVariantId, setSelectedVariantId] = useState(cartItem.variantId)

	const handleVariantChange = (newId: string) => {
		setSelectedVariantId(newId)
		updateVariant(cartItem.id, variant.id, newId)
	}

	return (
		<Select value={selectedVariantId} onValueChange={handleVariantChange}>
			<SelectTrigger className='px-5 md:py-[22px] lg:py-7 border-1 aspect-square rounded-sm md:rounded-md cursor-pointer border-transparent-text hover:border-accent lg:text-2xl'>
				<SelectValue placeholder='Варіант' />
			</SelectTrigger>
			<SelectContent>
				{product.productVariants.map(v => (
					<SelectItem key={v.id} value={v.id}>
						<span className='text:lg md:text-xl lg:text-2xl '>{v.name} ml</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
