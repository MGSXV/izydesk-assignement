import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth = () => {

	const user = null // TODO: Get user from context with custom hook (useAuth)
	const location = useLocation()
	if (!user && location.pathname !== '/auth') {
		return <Navigate to="/auth" />
	}
	return (
		user ? <Outlet /> : <Navigate to="/auth" />
	)
}

export default RequireAuth