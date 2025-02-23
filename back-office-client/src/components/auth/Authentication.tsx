import { useAuth, useToast } from "@/hooks";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Signup from "./Signup";
import { Navigate } from "react-router-dom";

const Authentication = () => {

	const [tab, setTab] = useState("login");
	const { toast } = useToast();
	const { user } = useAuth();

	if (user) {
		return <Navigate to="/" />
	}

	const tabChange = () => setTab(tab === "login" ? "signup" : "login")

	return (
		<div className="w-full h-full flex items-center justify-center">
			<Tabs defaultValue="login" value={tab} onValueChange={tabChange} id="form-container" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="signup">Signup</TabsTrigger>
				</TabsList>
				<Login toast={toast} />
				<Signup />
			</Tabs>
		</div>
	)
}

export default Authentication