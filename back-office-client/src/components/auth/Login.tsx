import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRef, useState } from "react"
import { axios } from "@/config/api"
import { IUser } from "@/types"
import { useAuth } from "@/hooks"
import logo from "@/assets/logo-max.svg"
import { useLocation, useNavigate } from "react-router-dom"

const LOGIN_ENDPOINT = "/api/auth/login"

const USERNAME_REGEX = /^[A-Za-z0-9]+$/i
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_#@$%]).+$/

interface ILogin {
	username: string
	password: string
}

const Login = ({ toast }: { toast: any }) => {

	const { register, handleSubmit, formState: { errors } } = useForm<ILogin>()
	const [isLoading, setIsLoading] = useState(false)
	const login_button = useRef<HTMLButtonElement>(null)
	const { handleSetUser } = useAuth()
	const location = useLocation()
	const navigate = useNavigate()
	const from = location.state?.from?.pathname || '/'

	const login = (data: ILogin) => {
		setIsLoading(true)
		axios.post(LOGIN_ENDPOINT, {
			username: data.username,
			password: data.password
		}, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		}).then((response) => {
			handleSetUser(response.data as IUser)
			navigate(from, { replace: true })
			toast({
				title: "success",
				description: "login successful",
				variant: "success"
			})
		}).catch((error) => {
			toast({
				title: "Error",
				description: error?.response?.data?.error || 'An error occurred',
				variant: "destructive",
			})
		}).finally(() => {
			setIsLoading(false)
			login_button.current?.focus()
		})
	}

	const onSubmit: SubmitHandler<ILogin> = (data) => login(data)

	return (
		<TabsContent value="login">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-center">
						<a href="/">
							<img src={logo} alt="logo" className="no-underline" />
						</a>
					</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="username">Username</Label>
							<Input id="username" disabled={isLoading} placeholder="username..."
								value={'testuser'}
								{...register('username', { required: true, minLength: 4, maxLength: 20, pattern: USERNAME_REGEX  })}
								aria-invalid={errors.username ? true : false } />
						</div>
						<div className="space-y-1">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" disabled={isLoading} placeholder="password..."
								value={'Test-2015'}
								{...register('password', { required: true, minLength: 8, pattern: PASSWORD_REGEX })}
								aria-invalid={errors.password ? true : false } />
						</div>
					</CardContent>
					<CardFooter>
						<Button ref={login_button} type="submit" disabled={isLoading}>
							{isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
							{isLoading ? "Wait..." : "Login"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</TabsContent>
	)
}

export default Login