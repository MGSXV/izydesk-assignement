import React, { Fragment, useEffect } from "react";
import { Navbar } from ".";
import { useCategory } from "@/context";
import { useToast } from "@/hooks";
import { AppSidebar } from "@/components/app-sidebar";
import { axios } from "@/config/api"

const AuthOutlet = ({ children }: { children: React.ReactNode }) => {

	const { setCategories } = useCategory()
	const { toast } = useToast()


	useEffect(() => {

		axios.get("/api/categories").then((res: any) => {
			if (res && res.data && res.status && res.status === 200) {
				setCategories([...res.data])
			}
		}).catch((error: any) => {
			toast({
				title: "Error",
				description: error?.response?.data?.error || 'An error occurred',
				variant: "destructive",
			})
		})
	}, [])

	return (
		<Fragment>
			<AppSidebar />
			<main className="flex flex-col w-auto flex-grow p-2 overflow-x-hidden overflow-y-auto">
				<Navbar />
				<div className="flex flex-col flex-grow my-4">
					{children}
				</div>
			</main>
		</Fragment>
	)
}

export default AuthOutlet