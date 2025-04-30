import { IInputProps } from '@/types/Interfaces'
import React from 'react'
import { transliterate as tr, slugify } from 'transliteration'

export default function Input({ text }: IInputProps) {
	const id = slugify(tr(text))

	return (
		<div className='flex gap-2 items-center'>
			<div className='relative w-5 h-5'>
				<input
					id={id}
					type='checkbox'
					className='appearance-none w-full h-full border-1 rounded-xs li-hover'
				/>
			</div>
			<label htmlFor={id} className='cursor-pointer'>
				{text}
			</label>
		</div>
	)
}
