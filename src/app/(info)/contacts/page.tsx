import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Контакти | M in M',
	openGraph: {
		title: 'Контакти | M in M',
	},
}

export default function Contacts() {
	return (
		<section className='container py-10'>
			<h1 className='text-3xl font-bold mb-6'>Контакти</h1>
			<p>
				📍 Адреса: Київ, вул. Прикладна, 10 <br />
				📞 Телефон:{' '}
				<a href='tel:+380935412030' className='text-accent hover:underline'>
					093 541 20 30
				</a>{' '}
				<br />
				Email:{' '}
				<a
					href='mailto:m.in.m.nails@gmail.com'
					className='text-accent hover:underline'
				>
					m.in.m.nails@gmail.com
				</a>
			</p>
		</section>
	)
}
