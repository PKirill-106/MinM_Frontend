'use client'
import BannerSlider from '@/components/BannerSlider'
import ProductSection from '@/components/products/ProductSection'
import useProducts from '@/hooks/useProducts'
import React from 'react'
export default function Home() {
	const { products, isLoading, error } = useProducts()

	if (isLoading) return <p>Loading...</p>

	const topProducts = products.sort((a, b) => b.rating - a.rating).slice(0, 8)


	return (
		<div className='container -mt-16 flex flex-col gap-8 md:gap-10 lg:gap-16 xl:gap-20'>
			<BannerSlider />
			<ProductSection
				title='Топові товари для майстрів манікюру'
				highlight='Топові товари'
				products={topProducts}
				linkLabel='Топові матеріали'
				linkHref='/products/top'
			/>

			<ProductSection
				title='Новинки магазину'
				highlight='Новинки'
				products={topProducts}
				linkLabel='Всі новинки'
				linkHref='/products/new'
			/>
		</div>
	)
}
