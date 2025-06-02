import { IProductTopProps } from '@/types/Interfaces'
import ProductTopLeft from './product-top-left/ProductTopLeft'
import ProductTopRight from './ProductTopRight'

export default function ProductTop({ product, category }: IProductTopProps) {
	return (
		<div className='flex flex-col md:grid md:grid-cols-3 gap-6'>
			<ProductTopLeft product={product} />
			<ProductTopRight product={product} category={category} />
		</div>
	)
}
