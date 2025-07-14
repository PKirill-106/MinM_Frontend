'use client'
import { IProductCard } from '@/types/Interfaces'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from '../FavoriteButton'

export default function ProductCard({ product, categories }: IProductCard) {
	const category = categories.find(cat => cat.id === product.categoryId)
	if (!category) {
		console.error(`Category not found for product ${product.id}`)
		return <div className=''>Product unavailable</div>
	}

	const firstImage = product.productImages?.[0]
	const rawPath = firstImage?.filePath
	const imageUrl =
		rawPath?.startsWith('http') || rawPath?.startsWith('/')
			? rawPath
			: rawPath
			? `/${rawPath}`
			: '/prod/product-image-unavailable.png'

	const productUrl = `/product/${product.slug}`

	return (
		<div className='relative flex flex-col bg-white max-w-90 overflow-hidden rounded-lg shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300'>
			<Link href={productUrl} className='mb-1'>
				<div className='relative w-full aspect-square'>
					<Image
						src={imageUrl}
						alt={product.name}
						fill
						className='object-cover'
					/>
				</div>
			</Link>
			<div className=' flex flex-col flex-1 p-2 pt-0 md:p-2 md:pt-0 lg:p-3 lg:pt-0 justify-between'>
				<div className='h-15 md:h-17 lg:h-18 xl:h-21'>
					<p className='caption mb-1'>{category.name || ''}</p>
					<Link href={productUrl}>
						<h3 className='line-clamp-2'>{product.name}</h3>
					</Link>
				</div>

				<div className='flex justify-between items-center pt-2 md:pt-3 lg:pt-4 xl:pt-6'>
					<p className='price '>{product.productVariants[0].price} грн</p>
					<div className='flex gap-3 lg:gap:4 xl:gap-5'>
						<FavoriteButton
							productId={product.id}
							heartClassName='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10'
							buttonClassName='absolute top-0 right-0 p-2 md:p-3 lg:p-4 hover:text-red-500 transition cursor-pointer'
						/>
						<button className='text-accent hover:text-button-text transition duration-200 cursor-pointer'>
							<ShoppingBag className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
