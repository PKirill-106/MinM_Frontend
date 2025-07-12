import AboutMiddle from '@/components/static-pages/about/AboutMiddle'
import AboutTop from '@/components/static-pages/about/AboutTop'
import AboutWhyUs from '@/components/static-pages/about/AboutWhyUs'

export default function About() {
	return (
		<div className='container flex flex-col gap-6 md:gap-10 lg:gap-15 xl:gap-20'>
			<AboutTop />
			<AboutMiddle />
			<AboutWhyUs />
			<h3 className='border-l-2 md:border-l-0 border-accent pl-2 text-left md:text-center'>
				<strong>Наша місія</strong>
				<br className='hidden md:block' /> допомагати майстрам розкривати свій
				талант,
				<br className='hidden md:block' /> створюючи <span>безпечну</span>,{' '}
				<span>якісну</span> й <span>професійну</span> продукцію,
				<br className='hidden md:block' /> з якою приємно працювати.
			</h3>
		</div>
	)
}
