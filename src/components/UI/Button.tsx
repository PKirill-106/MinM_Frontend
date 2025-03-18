import { IButtonProps } from '@/types/Interfaces'
import { Instagram, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Button({ text, variant, onClick, href }: IButtonProps) {
	const baseClasses: string =
		'button-text inline-flex p-3 lg:p-4 text-base lg:text-xl gap-2 items-center rounded-md transition-all duration-300 cursor-pointer'

	const variantClasses: Record<'cart' | 'checkout' | 'instagram', string> = {
		cart: 'bg-button hover:bg-accent text-button',
		checkout: 'bg-green-500 hover:bg-green-600 text-white',
		instagram: 'bg-accent text-white hover:bg-button hover:text-button-text',
	}

	if (href) {
		return (
			<Link href={href} target='_blank'>
				<button className={`${baseClasses} ${variantClasses[variant]}`}>
					{variant === 'instagram' && <Instagram className='h-4 w-4 lg:h-5 md:w-5' />}
					{text}
				</button>
			</Link>
		)
	}

	return (
		<button onClick={onClick} className={baseClasses}>
			{text}
			{variant === 'checkout' && (
				<ShoppingBag className='h-3 w-3 md:h-5 md:w-5' />
			)}
		</button>
	)
}
