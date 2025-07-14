import FilteredFavoriteGrid from '@/components/FilteredFavoriteGrid'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'

export default async function FavoritePage() {
	const products = await getAllProducts()
	const categories = await getAllCategories()

	return (
		<div className='container'>
			<h2 className='mb-2 md:mb-3 lg:mb-4'>Обране:</h2>
			<FilteredFavoriteGrid products={products} categories={categories} />
		</div>
	)
}
