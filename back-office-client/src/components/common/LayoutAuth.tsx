import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import AuthOutlet from "./AuthOutlet"
import { CategoryProvider } from "@/context"

const LayoutAuth = () => {
	return (
		<SidebarProvider>
			<CategoryProvider>
				<AuthOutlet>
					<Outlet />
				</AuthOutlet>
			</CategoryProvider>
		</SidebarProvider>
	)
}

export default LayoutAuth