import React from 'react'

export default function PaginationControls() {
  return (
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
	)
}
