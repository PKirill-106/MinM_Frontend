import CategoryProductsClient from '@/components/admin/CategoryProductsClient'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'

export default async function CategoryProductsPage({
	params,
}: {
	params: Promise<{ slug?: string[] }>
}) {
	const [slug] = (await params).slug || ['']

	const products: IProduct[] = await getAllProducts()
	const categories: ICategory[] = await getAllCategories()

	const activeCategory = categories.find(c => c.slug === slug)

	const subcategories = categories.filter(
		c => c.parentCategoryId === activeCategory?.id
	)

	const filteredProducts = products.filter(
		p => p.categoryId === activeCategory?.id
	)

	return (
		<div>
			{!activeCategory ? (
				<div>
					<h3>Вибраної категорії не існує</h3>
				</div>
			) : (
				<CategoryProductsClient
					activeCategory={activeCategory}
					products={filteredProducts}
					categories={categories}
					subcategories={subcategories}
				/>
			)}
		</div>
	)
}
