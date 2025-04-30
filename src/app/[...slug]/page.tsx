import ProductGrid from '@/components/products/ProductGrid'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'
import ProductFilters from '../filters/ProductFilters'
import PaginationControls from '../PaginationControls'

export default async function CategoryPage({
	params,
}: {
	params: { slug: string[] }
}) {
	const products: IProduct[] = await getAllProducts()
	const categories: ICategory[] = await getAllCategories()

	

	return (
		<div className='container'>
			<h2 className='mb-6'>Каталог</h2>

			<ProductFilters categories={categories} />

			<ProductGrid categories={categories} products={products} />

			<PaginationControls />
		</div>
	)
}
