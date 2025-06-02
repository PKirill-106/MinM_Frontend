import { IProductTopProps } from '@/types/Interfaces'

export default function ProductTopRight({
	product,
	category,
}: IProductTopProps) {
	return (
		<div className='col-span-2'>
			<h2 className='mb-4'>{product?.name}</h2>
		</div>
	)
}
