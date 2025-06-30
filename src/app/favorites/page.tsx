import FilteredFavoriteGrid from '@/components/FilteredFavoriteGrid'
import { authOptions } from '@/lib/auth'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { getServerSession } from 'next-auth'

export default async function FavoritePage() {
	const session = await getServerSession(authOptions)
	const products = await getAllProducts()
	const categories = await getAllCategories()

	// let favoriteIds: string[] = []

	if (session?.user) {
		// favoriteIds = await getServerFavorites(session.user.id)
	}

	return (
		<div className='container'>
			<h2 className='mb-2 md:mb-3 lg:mb-4'>Обране:</h2>
			<FilteredFavoriteGrid
				products={products}
				categories={categories}
			/>
		</div>
	)
}
