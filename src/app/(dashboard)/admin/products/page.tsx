import { Button } from '@/components/UI/button'
import { getAllCategories } from '@/lib/services/categoryServices'
import { ICategory } from '@/types/Interfaces'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function ProductsPage() {
	const categories: ICategory[] = await getAllCategories()

	const filteredCategories = categories.filter(c => c.parentCategoryId === null)

	return (
		<div className='flex flex-col w-full'>
			<h1 className='mb-10'>Категорії</h1>
			<div className='flex flex-col items-center max-w-xs'>
				{filteredCategories ? (
					<ul className='space-y-2 w-full'>
						{filteredCategories.map(cat => (
							<li key={cat.id}>
								<Link href={`/admin/products/${cat.slug}`}>
									<div className='flex justify-between p-4 w-full max-w-md border-1 border-transparent-text rounded-md hover:text-accent group'>
										{cat.name}
										<ArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
									</div>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<h3>Немає жодної категорії</h3>
				)}

				<Button className='mt-4 rounded-full'>+</Button>
			</div>
		</div>
	)
}
