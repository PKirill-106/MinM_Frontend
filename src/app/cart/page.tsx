import CartList from '@/components/cart/CartList'
import { getAllProducts } from '@/lib/services/productServices'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Кошик  | M in M Nails',
	description:
		'Ваш кошик з товарами для манікюру. Готові до оформлення замовлення',
	openGraph: {
		title: 'Кошик  | M in M Nails',
		description:
			'Ваш кошик з товарами для манікюру. Готові до оформлення замовлення',
	},
}

export default async function CartPage() {
	const products = await getAllProducts()

	return (
		<div className='container'>
			<h2 className='mb-2 md:mb-3 lg:mb-4'>Кошик</h2>
			<CartList products={products} />
		</div>
	)
}
