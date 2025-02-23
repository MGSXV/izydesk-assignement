import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"

const Layout = () => {

	return (
		<>
			<Toaster />
			<Outlet />
		</>
	)
}

export default Layout