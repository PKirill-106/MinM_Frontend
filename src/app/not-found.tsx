import Link from 'next/link'

export default function NotFound() {
	return (
		<section className='flex h-screen items-center justify-center'>
			<div className='text-center'>
				<h1 className='text-5xl font-bold'>404</h1>
				<p className='mt-4 text-lg'>Сторінку не знайдено</p>
				<Link
					href='/'
					className='mt-6 inline-block text-accent hover:underline'
				>
					Повернутися на головну
				</Link>
			</div>
		</section>
	)
}
