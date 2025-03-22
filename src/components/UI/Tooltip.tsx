import { ITooltipProps } from '@/types/Interfaces'
import React, { useState } from 'react'

export default function Tooltip({
	content,
	children,
	isShoppingBag,
	className,
}: ITooltipProps) {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<div
			className={`relative flex ${className}`}
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
		>
			{children}

			{isVisible && (
				<div
					className={`absolute z-50 bg-foreground text-white text-xs text-center p-2 rounded-md top-full left-1/2 transform -translate-x-1/2 mt-2 shadow-lg animate-fadeIn min-w-max ${
						isShoppingBag ? 'md:-translate-x-8' : ''
					} `}
				>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-foreground' />
					{content}
				</div>
			)}
		</div>
	)
}
