'use client'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/UI/alert-dialog'
import { Trash } from 'lucide-react'
import { Button } from '../UI/button'
import { IAlertOnDelete } from './interface'
export default function AlertOnDelete({ onClick, pName }: IAlertOnDelete) {
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button variant='destructive' className='ml-4'>
					<Trash />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Ви впевнені, що хочете видалити?</AlertDialogTitle>
					<AlertDialogDescription>
						Ця дія не може бути скасована. Це назавжди видалить '{pName}'.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Скасувати</AlertDialogCancel>
					<AlertDialogAction onClick={onClick}>Так, видалити</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
