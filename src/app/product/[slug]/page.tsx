import ProductTop from '@/components/product-page/product-top/ProductTop'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'

export default async function ProductPage({
	params,
}: {
	params: { slug: string }
}) {
	const { slug } = await params

	const products: IProduct[] = await getAllProducts()
	const categories: ICategory[] = await getAllCategories()

	const product = products.find(p => p.slug === slug)

	const subcategory = categories.find(cat => cat.id === product?.categoryId)
	const category = categories.find(
		cat => cat.id === subcategory?.parentCategoryId
	)

	if (!product  || !category) {
		return <div className='container'>Product not found</div>
	}

	return (
		<div className='container'>
			<ProductTop product={product} category={category} />
		</div>
	)
}
