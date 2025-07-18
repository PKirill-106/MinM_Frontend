'use client'
import { useCart } from '@/providers/CartProvider'
import { ICartItemProps } from '@/types/Interfaces'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import Quantity from '../product-page/product-top/product-top-right/Quantity'
import { Button } from '../UI/button'
import SelectVariant from './SelectVariant'

export default function CartItem({ product, cartItem }: ICartItemProps) {
	const { removeFromCart, updateQuantity } = useCart()

	const variant = product.productVariants.find(v => v.id === cartItem.variantId)

	if (!variant) {
		return (
			<div className='text-destructive font-semibold'>Variant not found</div>
		)
	}

	const imgSrc = product.productImages?.[0]?.filePath
	const validSrc =
		imgSrc && (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))
			? imgSrc
			: '/prod/product-image-unavailable.png'

	const totalPrice = variant.price * cartItem.quantity

	return (
		<div className='flex items-center gap-4 justify-center'>
			<div className='flex flex-col p-4 w-full max-w-2xl border-1 border-transparent-text rounded-md gap-3'>
				<div className='flex gap-2 md:gap-4'>
					<div className='flex-1 md:flex-auto relative aspect-square min-w-22 w-full max-w-35 '>
						<Image
							src={validSrc}
							alt={product.name}
							fill
							className='object-cover rounded-sm'
						/>
					</div>
					<div className='flex-3 md:flex-auto flex flex-col gap-2 md:gap-4 justify-between md:basis-auto w-full'>
						<div className='w-full flex gap-4 justify-between items-start'>
							<p>{product.name}</p>
							<Button
								onClick={() => removeFromCart(cartItem!.id, variant.id)}
								variant='destructive'
								className='p-0 m-0'
							>
								<Trash className='w-20' />
							</Button>
						</div>
						<div className='flex flex-col md:flex-row items-start md:items-end justify-between gap-4'>
							<div className='hidden md:flex gap-4 items-center order-1 md:order-0 w-full md:w-auto'>
								<SelectVariant
									variant={variant}
									cartItem={cartItem}
									product={product}
								/>
								<Quantity
									quantity={cartItem.quantity}
									amount={variant.unitsInStock}
									onChange={newQuantity =>
										updateQuantity(product.id, variant.id, newQuantity)
									}
								/>
							</div>
							<p className='price order-0 md:order-1 gap-4'>{totalPrice} грн</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col w-full h-full md:hidden gap-4 order-1'>
					<SelectVariant
						variant={variant}
						cartItem={cartItem}
						product={product}
					/>
					<Quantity
						quantity={cartItem.quantity}
						amount={variant.unitsInStock}
						onChange={newQuantity =>
							updateQuantity(product.id, variant.id, newQuantity)
						}
					/>
				</div>
			</div>
		</div>
	)
}
