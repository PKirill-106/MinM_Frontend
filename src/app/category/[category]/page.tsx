import { useParams } from 'next/navigation'

export default function SubcategoryPage() {
	const { category, subcategory } = useParams()

	return (
		<div>
			<h1>Category: {category}</h1>
		</div>
	)
}
