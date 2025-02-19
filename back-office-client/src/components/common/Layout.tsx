import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Layout = () => {
	useEffect(() => {
		console.log('Layout mounted')
	},[])
	return (
		<>
			<Outlet />
		</>
	)
}

export default Layout