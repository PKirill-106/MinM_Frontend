'use client'

import { Button } from '../UI/button'

interface SaveButtonProps {
	changed: boolean
	onSave: () => void
}

export function SaveButton({ changed, onSave }: SaveButtonProps) {
	return (
		<div className='max-w-2xl w-full flex justify-end'>
			<Button onClick={onSave} disabled={!changed}>
				Зберегти зміни
			</Button>
		</div>
	)
}
