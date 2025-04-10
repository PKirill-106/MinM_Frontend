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
		category && category.ParentCategoryId !== 0
			? categories.find(cat => cat.id === category.ParentCategoryId)
			: null

	const productUrl = parentCategory
		? `/${parentCategory.slug}/${category?.slug}/${product.slug}`
		: `/${category?.slug}/${product.slug}`

	return (
		<div className='flex flex-col bg-white max-w-90 aspect-[2/3] overflow-hidden rounded-lg shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300'>
			<Image
				src={product.images[0]}
				alt={product.name}
				width={267}
				height={267}
				className='w-full h-[66%] object-cover mb-3'
			/>
			<div className='flex flex-col h-[34%] p-4 pt-0 justify-between'>
				<div>
					<p className='caption mb-1'>{category?.name || ''}</p>
					<Link href={productUrl}>
						<h3 className='line-clamp-2 '>{product.name}</h3>
					</Link>
				</div>

				<div className='flex justify-between items-center pt-0 lg:pt-6 xl:pt-8'>
					<p className='price '>{product.price} грн</p>
					<div className='flex gap-3 lg:gap:4 xl:gap-5'>
						<button className='hover:text-red-600 transition'>
							<Heart className='h-6 w-6 md:h-8 md:w-8 lg:h-9 lg:w-9 xl:h-10 xl:w-10' />
						</button>
						<button className='hover:text-accent transition duration-200'>
							<ShoppingBag className='h-6 w-6 md:h-8 md:w-8 lg:h-9 lg:w-9 xl:h-10 xl:w-10 text-accent hover:text-button-text transition duration-200' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
