import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import AuthOutlet from "./AuthOutlet"

const LayoutAuth = () => {
	return (
		<SidebarProvider>
			<AuthOutlet>
				<Outlet />
			</AuthOutlet>
		</SidebarProvider>
	)
}

export default LayoutAuth