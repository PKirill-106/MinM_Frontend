import { IProductTopProps } from "@/types/Interfaces";

export default function ProductTopRight({ product, category }: IProductTopProps) {
	return (
		<div>
			<h2 className='mb-4'>{product?.name}</h2>
		</div>
	)
}
