import React from 'react'
import Logo from './UI/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  

  return (
		<section className='bg-foreground text-white section'>
			<div className='container'>
				<div className='grid-cols-3 gap-[30px] flex justify-between'>
					<div>
						<Logo width={150} height={60} isFooter={true} />
					</div>
					<div>d</div>
					<div>s</div>
				</div>
				<p>© {year} “M-in-M” — український виробник гель-лакових систем</p>
			</div>
		</section>
	)
}
