import { IButtonProps } from '@/types/Interfaces'
import { Instagram, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Button({ text, variant, onClick, href }: IButtonProps) {
	const baseClasses: string =
		'button-text inline-flex text-base lg:text-xl justify-center items-center transition-all duration-300 cursor-pointer'

	const variantClasses: Record<'cart' | 'instagram', string> = {
		cart: 'w-full md:w-auto py-3 md:px-4 lg:py-4 lg:px-5 gap-3 rounded-lg font-semibold bg-button hover:bg-accent active:bg-accent text-button-text hover:text-white-text active:text-white-text',
		instagram:
			'py-2 px-4 md:py-3 md:px-5 lg:py-5 lg:px-6 gap-2 rounded-md bg-accent text-white hover:bg-button hover:text-button-text active:bg-button active:text-button-text',
	}

	if (href) {
		return (
			<Link href={href} target='_blank'>
				<button className={`${baseClasses} ${variantClasses[variant]}`}>
					{variant === 'instagram' && (
						<Instagram className='h-4 w-4 lg:h-5 md:w-5' />
					)}
					{text}
				</button>
			</Link>
		)
	}

	return (
		<button
			onClick={onClick}
			className={`${baseClasses} ${variantClasses[variant]} `}
		>
			{text}
			{variant === 'cart' && (
				<ShoppingBag className='h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7' />
			)}
		</button>
	)
}
