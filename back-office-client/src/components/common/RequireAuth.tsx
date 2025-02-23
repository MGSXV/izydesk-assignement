import { useAuth } from "@/hooks"
import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth = () => {

	const { user } = useAuth()
	const location = useLocation()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (user) {
			setIsLoading(false)
		}
	}, [user])
	if (isLoading) {
		return <div>Loading..</div>
	}
	if (!user && location.pathname !== '/auth') {
		return <Navigate to="/auth" />
	}
	return (
		user ? <Outlet /> : <Navigate to="/auth" />
	)
}

export default RequireAuth