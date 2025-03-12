import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  

  return (
		<section className='bg-foreground text-white section'>
			<div className='container'>
				<div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<p>© {year} “M-in-M” — український виробник гель-лакових систем</p>
			</div>
		</section>
	)
}
