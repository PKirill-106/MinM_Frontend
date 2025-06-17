'use client'
import Button from '@/components/UI/MyButton'
import { Heart } from 'lucide-react'
import { useCallback, useState } from 'react'
import { IProductCart } from '../../interfaces'

export default function ProductCart({ amount }: IProductCart) {
	const [count, setCount] = useState(1)

	const handleDecrement = useCallback(() => {
		if (count > 1) {
			setCount(prev => prev - 1)
		}
		return
	}, [count])
	const handleIncrement = useCallback(() => {
		if (count < amount) {
			setCount(prev => prev + 1)
		}
		return
	}, [count])

	return (
		<div className='flex flex-col md:flex-row items-center gap-2 lg:gap-4 w-full md:w-auto'>
			<div className='flex gap-6 items-center justify-between md:justify-center w-full md:w-auto p-0 md:py-2 md:px-4 lg:py-3 lg:px-5 border-transparent-text border-1 rounded-lg font-medium md:text-xl lg:text-2xl text-accent'>
				<button
					onClick={handleDecrement}
					className='py-3 px-6 md:p-0 cursor-pointer link-hover'
				>
					-
				</button>
				<span className='min-w-7 text-center text-foreground'>{count}</span>
				<button
					onClick={handleIncrement}
					className='py-3 px-6 md:p-0 cursor-pointer link-hover'
				>
					+
				</button>
			</div>
			<Button text='В КОШИК' variant='cart' />
			<button className='hidden md:flex'>
				<Heart className='link-size link-hover cursor-pointer' />
			</button>
		</div>
	)
}
