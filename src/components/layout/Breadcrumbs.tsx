'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Breadcrumbs() {
	const pathname = usePathname()
	const pathSegments = pathname.split('/').filter(Boolean)
	const isHomePage = pathname === '/'
	const [isNotFound, setIsNotFound] = useState(false)

	// check if user is currently on not-found(404) page
	useEffect(() => {
		fetch(pathname, { method: 'HEAD' })
			.then(response => {
				if (response.status === 404) {
					setIsNotFound(true)
				} else {
					setIsNotFound(false)
				}
			})
			.catch(() => setIsNotFound(true)) // If the request failed, consider that 404
	}, [pathname])

	if (isHomePage) return null

	return (
		<section className='px-2 lg:px-15 xl:px-30 mt-[87px] md:mt-[91px] lg:mt-[111px] xl:mt-[119px]'>
			<div className='flex container items-center gap-2 text-gray-500'>
				<Link href='/'>
					<Home className='h-5 w-5 text-accent hover:text-pink-600 ease-out duration-300 transition-all' />
				</Link>

				{pathSegments.length > 0 && !isNotFound ? (
					pathSegments.map((segment, index) => {
						const href = '/' + pathSegments.slice(0, index + 1).join('/')
						const isLast = index === pathSegments.length - 1

						return (
							<div key={href} className='flex items-center gap-2'>
								<span>{'>'}</span>
								{isLast ? (
									<span className='capitalize'>
										{decodeURIComponent(segment)}
									</span>
								) : (
									<Link
										href={href}
										className='hover:text-pink-600 ease-out duration-300 transition-all capitalize'
									>
										{decodeURIComponent(segment)}
									</Link>
								)}
							</div>
						)
					})
				) : (
					// if page is not found
					<span className='text-gray-500'>{'>'} Сторінку не знайдено</span>
				)}
			</div>
		</section>
	)
}
