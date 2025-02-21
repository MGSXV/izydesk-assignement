import * as React from "react"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks"
import { useCategory } from "@/context"
import { NavCategories } from "./nav-categories"
import logo_lg from "@/assets/logo-max.svg"
import logo_sm from "@/assets/logo-min.svg"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

	const { user } = useAuth()
	const { categories } = useCategory()
	const { state } = useSidebar();

	return (
		<Sidebar variant="floating" collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/">
								<div className={`${state !== "expanded" ? "flex" : "hidden"} aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground`}>
									<img src={logo_sm} alt="IZYDESK" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<img src={logo_lg} alt="IZYDESK" />
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavCategories categories={categories} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	)
}
