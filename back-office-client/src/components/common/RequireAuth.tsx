import { useAuth } from "@/hooks"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth = () => {

	const { user } = useAuth()
	const location = useLocation()
	if (!user && location.pathname !== '/auth') {
		return <Navigate to="/auth" />
	}
	return (
		user ? <Outlet /> : <Navigate to="/auth" />
	)
}

export default RequireAuth