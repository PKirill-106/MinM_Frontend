'use client'

import Modal from '@/components/UI/Modal'
import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import { Textarea } from '@/components/UI/textarea'
import { useEffect, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../UI/select'
import { ICategoryModal } from '../interface'
import { ICreateCategory, IUpdateCategory } from '@/types/Interfaces'


export default function CategoryModal({
	isOpen,
	onClose,
	onSubmit,
	accessToken,
	type,
	categoryData,
	categories,
}: ICategoryModal) {
	const isUpdate = type === 'update'

	const [name, setName] = useState('')
	const [description, setDescription] = useState('Опис')
	const [parentCategoryId, setParentCategoryId] = useState<string>('')

	useEffect(() => {
		if (isUpdate && categoryData) {
			setName(categoryData.name)
			setDescription(categoryData.description || 'Опис')
			setParentCategoryId(categoryData.parentCategoryId || '')
		} else {
			setName('')
			setDescription('Опис')
			setParentCategoryId('')
		}
	}, [isUpdate, categoryData, isOpen])

	const handleSubmit = () => {
		const payload: ICreateCategory | IUpdateCategory = {
			name,
			description,
			parentCategoryId: parentCategoryId || undefined,
			...(isUpdate && categoryData?.id ? { id: categoryData.id } : {}),
		}

		onSubmit(payload, accessToken)
	}

	const isValid = name.trim().length > 0

	return (
		<Modal isOpen={isOpen} onClose={onClose} isInput>
			<div className='space-y-4 p-6 bg-white rounded shadow-lg w-full max-w-md'>
				<h2 className='text-xl font-semibold'>
					{isUpdate ? 'Редагувати категорію' : 'Створити категорію'}
				</h2>

				<div>
					<span className='mb-1 block'>Назва категорії</span>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Назва'
						required
					/>
				</div>

				<div>
					<span className='mb-1 block'>Опис</span>
					<Textarea
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder='Опис'
					/>
				</div>

				<div>
					<span className='mb-1 block'>
						Батьківська категорія (необовʼязково)
					</span>
					<Select value={parentCategoryId} onValueChange={setParentCategoryId}>
						<SelectTrigger>
							<SelectValue>
								{parentCategoryId
									? categories.find(c => c.id === parentCategoryId)?.name
									: 'Оберіть категорію'}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value=''>Немає</SelectItem>
							{categories
								.filter(c => c.parentCategoryId === null)
								.map(c => (
									<SelectItem key={c.id} value={c.id}>
										{c.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>

				<div className='flex justify-end gap-2 pt-4'>
					<Button variant='outline' type='button' onClick={onClose}>
						Скасувати
					</Button>
					<Button type='button' disabled={!isValid} onClick={handleSubmit}>
						{isUpdate ? 'Зберегти' : 'Створити'}
					</Button>
				</div>
			</div>
		</Modal>
	)
}
