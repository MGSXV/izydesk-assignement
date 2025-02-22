import { Fragment, useState } from "react";
import { AddCategory, CategoryCards } from "@/components/category";

const Dashboard = () => {

	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => setIsOpen(!isOpen)

	return (
		<Fragment>
			<div className="w-full h-fit flex flex-col gap-3">
				<h2 className="text-3xl font-bold tracking-tight">
					Dashboard
				</h2>
				<CategoryCards onclick={handleOpen} />
			</div>
			<AddCategory isOpen={isOpen} onOpenChange={handleOpen} />
		</Fragment>
	);
}

export default Dashboard;