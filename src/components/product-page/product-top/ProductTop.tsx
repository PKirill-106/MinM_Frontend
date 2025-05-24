import { IProductTopProps } from '@/types/Interfaces'
import ProductTopLeft from './ProductTopLeft'
import ProductTopRight from './ProductTopRight'

export default function ProductTop({ product, category }: IProductTopProps) {
	return (
		<div className='flex flex-col md:grid md:grid-cols-[30%_70%] gap-8'>
			<ProductTopLeft product={product} />
			<ProductTopRight product={product} category={category} />
		</div>
	)
}
