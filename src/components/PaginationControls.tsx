'use client'
import { IPaginationControlsProps } from '@/types/Interfaces'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function PaginationControls({ totalPages }: IPaginationControlsProps) {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const currentPage = parseInt(searchParams.get('page') || '1', 10)

	const createPageLink = (page: number) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', page.toString())
		return `${pathname}?${params.toString()}`
	}

	return (
		<div className='flex justify-center mt-10'>
			<div className='flex space-x-2'>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
					<Link
						key={page}
						href={createPageLink(page)}
						className={`w-8 h-8 flex items-center justify-center border rounded text-sm transition ${
							page === currentPage
								? 'bg-accent text-white'
								: 'hover:bg-accent hover:text-white'
						}`}
					>
						{page}
					</Link>
				))}
			</div>
		</div>
	)
}