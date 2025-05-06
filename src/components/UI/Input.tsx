'use client'
import { IInputProps } from '@/types/Interfaces'
import { Check } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { transliterate as tr, slugify } from 'transliteration'

export default function Input({ text }: IInputProps) {
	const id = slugify(tr(text))
	const searchParams = useSearchParams()
	const router = useRouter()

	const isChecked = searchParams.get(id) === 'true'

	const handleChange = () => {
		const params = new URLSearchParams(searchParams)
		if (isChecked) {
			params.delete(id)
		} else {
			params.set(id, 'true')
		}
		router.push(`?${params.toString()}`)
	}

	return (
		<label htmlFor={id} className='flex gap-2 items-center cursor-pointer'>
			<div className='relative w-5 h-5'>
				<input
					id={id}
					type='checkbox'
					className={`appearance-none w-full h-full border-1 rounded-xs li-hover peer checked:invisible`}
					checked={isChecked}
					onChange={handleChange}
				/>
				<Check
					className='absolute top-0 left-0 bg-accent text-white-text rounded-xs invisible peer-checked:visible'
					strokeWidth={3}
					size={20}
				/>
			</div>
			{text}
		</label>
	)
}
