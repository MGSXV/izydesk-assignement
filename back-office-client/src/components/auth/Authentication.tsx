import { useEffect } from "react"

const Authentication = () => {
	useEffect(() => {
		console.log('Authentication mounted')
	}, [])

	return (
		<div className="bg-red-600">
			<h1>Authentication</h1>
		</div>
	)
}

export default Authentication