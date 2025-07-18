import ClientProfile from '@/components/profile/ClientProfile'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
	const session = await getServerSession()

  if (!session) {
		return redirect('/sign-in')
	}

	return (
		<div className='container'>
			<ClientProfile />
		</div>
	)
}
