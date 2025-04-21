export default async function CategoryPage({
	params,
}: {
	params: { slug: string[] }
}) {
	return (
		<div className='container py-10'>
			<h1 className='text-3xl font-bold mb-6'>Каталог</h1>

			<div className='flex flex-wrap items-center gap-4 mb-6'>
				<span className='checkbox-item'>✔ Сезон</span>
				<span className='checkbox-item'>✔ Акція</span>

				<select className='filter-select'>
					<option>Гелі для нарощення</option>
				</select>
				<select className='filter-select'>
					<option>Колекція CAT EYE</option>
				</select>
				<input type='color' className='color-picker border rounded' />
				<select className='filter-select ml-auto'>
					<option>Від дешевих</option>
				</select>
			</div>

			<div className='flex justify-center mt-10'>
				<div className='flex space-x-2'>
					{[1, 2, 3, 4, 5].map(page => (
						<button
							key={page}
							className='w-8 h-8 flex items-center justify-center border rounded text-sm hover:bg-accent hover:text-white transition'
						>
							{page}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
