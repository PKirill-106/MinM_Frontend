import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'
import { slugify } from 'transliteration'

export default async function ProductPage({
	params,
}: {
	params: { slug: string }
}) {
	const { slug } = await params

  const products: IProduct[] = await getAllProducts()
	const categories: ICategory[] = await getAllCategories()

	const product = products.find(p => slugify(p.name) === slug)


	const subcategory = categories.find(cat => cat.id === product?.categoryId)
	const category = categories.find(
		cat => cat.id === subcategory?.parentCategoryId
	)


	return (
		<div className='container'>
			<nav className='mb-4'>
				<ul className='flex gap-2 text-sm text-gray-500'>
					
				</ul>
			</nav>

			<h1 className='text-xl font-semibold mb-4'>{product?.name}</h1>
			{/* Render product details here */}
		</div>
	)
}
