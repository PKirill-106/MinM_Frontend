import FavoriteButton from '@/components/FavoriteButton'
import Button from '@/components/UI/MyButton'
import { IProductCart } from '../../interfaces'
import Quantity from './Quantity'

export default function ProductCart({ amount, productId }: IProductCart) {
	return (
		<div className='flex flex-col md:flex-row items-center gap-2 lg:gap-4 w-full md:w-auto'>
			<Quantity amount={amount} />

			<Button text='В КОШИК' variant='cart' />

			<div className='relative hidden md:flex'>
				<FavoriteButton
					productId={productId}
					heartClassName='link-size link-hover cursor-pointer'
					buttonClassName='hidden md:flex'
				/>
			</div>
		</div>
	)
}
