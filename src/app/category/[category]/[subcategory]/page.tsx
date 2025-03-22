import { useParams } from 'next/navigation'

export default function SubcategoryPage() {
	const { category, subcategory } = useParams()

	return (
		<div>
			<h1>Subcategory: {subcategory}</h1>
			<p>Parent Category: {category}</p>
		</div>
	)
}
