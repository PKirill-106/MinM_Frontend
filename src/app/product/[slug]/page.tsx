import Description from '@/components/product-page/description/Description'
import ProductTop from '@/components/product-page/product-top/ProductTop'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getProductBySlug } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'

export default async function ProductPage({
	params,
}: {
	params: { slug: string }
}) {
	const { slug } = await params

	const product: IProduct = await getProductBySlug(slug)
	const categories: ICategory[] = await getAllCategories()

	const subcategory = categories.find(cat => cat.id === product?.categoryId)
	const category = categories.find(
		cat =>
			cat.id === subcategory?.parentCategoryId || cat.id === product?.categoryId
	)

	if (!product || !category) {
		return <div className='container'>Product not found</div>
	}

	return (
		<div className='container'>
			<ProductTop product={product} category={category} />
			<Description description={product.description} />
		</div>
	)
}
