'use client'
import useCategories from '@/hooks/useCategories'
import { IProduct } from '@/types/Interfaces'
import { Heart, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
	product: IProduct
}

export default function ProductCard({ product }: ProductCardProps) {
	const { categories } = useCategories()

	const category = categories.find(cat => cat.id === product.categoryId)
	const parentCategory =
		category && category.parentCategoryId !== null
			? categories.find(cat => cat.id === category.parentCategoryId)
			: null

	const productUrl = parentCategory
		? `/${parentCategory.name.toLowerCase()}/${category?.name.toLowerCase()}/${
				product.slug
		  }`
		: `/${category?.name.toLowerCase()}/${product.slug}`

	return (
		<div className='relative flex flex-col bg-white max-w-90 overflow-hidden rounded-lg shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300'>
			<div className=' mb-1'>
				<Image
					src={product.images[0]}
					alt={product.name}
					width={267}
					height={267}
					className='w-full h-full aspect-square object-cover'
				/>
			</div>
			<div className=' flex flex-col flex-1 p-2 pt-0 md:p-2 md:pt-0 lg:p-3 lg:pt-0 justify-between'>
				<div className='h-15 md:h-17 lg:h-18 xl:h-21'>
					<p className='caption mb-1'>{category?.name || ''}</p>
					<Link href={productUrl}>
						<h3 className='line-clamp-2'>{product.name}</h3>
					</Link>
				</div>

				<div className='flex justify-between items-center pt-2 md:pt-3 lg:pt-4 xl:pt-6'>
					<p className='price '>{product.price} грн</p>
					<div className='flex gap-3 lg:gap:4 xl:gap-5'>
						<button className='absolute top-0 right-0 p-2 md:p-3 lg:p-4 hover:text-red-600 transition'>
							<Heart className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10' />
						</button>
						<button className='text-accent hover:text-button-text transition duration-200'>
							<ShoppingBag className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
