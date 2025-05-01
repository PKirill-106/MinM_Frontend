import ProductGrid from '@/components/products/ProductGrid'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'
import ProductFilters from '../filters/ProductFilters'
import PaginationControls from '../PaginationControls'
import { slugify } from 'transliteration'

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ slug?: string[] }>
}) {
	const products: IProduct[] = await getAllProducts()
	const categories: ICategory[] = await getAllCategories()

	const { slug = [] } = await params
	const categorySlug = slug[1] ?? null
	const subcategorySlug = slug[2] ?? null

	const activeCategory = categories.find(
		cat => slugify(cat.name) === categorySlug && !cat.parentCategoryId
	)
	const activeSubcategory = categories.find(
		cat => slugify(cat.name) === subcategorySlug && cat.parentCategoryId
	)
	let filteredProducts = products

	if (activeSubcategory) {
		filteredProducts = products.filter(
			p => p.categoryId === activeSubcategory.id
		)
	} else if (activeCategory) {
		const subcategoryIds = categories
			.filter(cat => cat.parentCategoryId === activeCategory.id)
			.map(cat => cat.id)
		filteredProducts = products.filter(p =>
			subcategoryIds.includes(p.categoryId)
		)
	}

	return (
		<div className='container'>
			<h2 className='mb-6'>
				{activeSubcategory?.name || activeCategory?.name || 'Каталог'}
			</h2>

			<ProductFilters categories={categories} />

			<ProductGrid categories={categories} products={filteredProducts} />

			<PaginationControls />
		</div>
	)
}
