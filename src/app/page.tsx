import BannerSlider from '@/components/BannerSlider'
import ProductSection from '@/components/products/ProductSection'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'
import React from 'react'

export default async function Home() {
	const products: IProduct[] = await getAllProducts()
	const categories: ICategory[] = await getAllCategories()

	return (
		<div className='container -mt-16 flex flex-col gap-8 md:gap-10 lg:gap-16 xl:gap-20'>
			<BannerSlider />
			<ProductSection
				title='Топові товари для майстрів манікюру'
				highlight='Топові товари'
				products={products}
				categories={categories}
				linkLabel='Топові матеріали'
				linkHref='/products/top'
			/>

			<ProductSection
				title='Новинки магазину'
				highlight='Новинки'
				products={products}
				categories={categories}
				linkLabel='Всі новинки'
				linkHref='/products/new'
			/>
		</div>
	)
}
