'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'

export default function Breadcrumbs() {
	const pathname = usePathname()
	const pathSegments = pathname.split('/').filter(Boolean)

	return (
		<section className='px-2 lg:px-15 xl:px-30 mt-[110px]'>
			<div className='flex container items-center gap-2 text-gray-500'>
				<Link href='/'>
					<Home className='h-5 w-5 text-pink-400 hover:text-pink-600' />
				</Link>

				{pathSegments.map((segment, index) => {
					const href = '/' + pathSegments.slice(0, index + 1).join('/')

					return (
						<div key={href} className='flex items-center gap-2'>
							<span>{'>'}</span>
							<Link href={href} className='hover:text-pink-600 capitalize'>
								{decodeURIComponent(segment)}
							</Link>
						</div>
					)
				})}
			</div>
		</section>
	)
}
