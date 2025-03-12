'use client'
import { ILogoProps } from '@/types/Interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Logo({ width, height, isFooter }: ILogoProps) {
	const pathname = usePathname()
	const [currentPath, setCurrentPath] = useState('')

	useEffect(() => {
		setCurrentPath(pathname)
	}, [pathname])

	const isHome = currentPath === '/'

	const logo = (
		<Image
			src={`${isFooter ? `/inverse-logo.svg` : `/logo.svg`}`}
			alt='logo'
			className='object-contain'
			width={width}
			height={height}
		/>
	)

	return (
		<div className='flex justify-center'>
			{isHome ? (
				logo
			) : (
				<Link
					href='/'
					className={`items-center ${
						isHome ? '' : `hover:scale-110 duration-300 hover:text-accent`
					} `}
				>
					{logo}
				</Link>
			)}
		</div>
	)
}
