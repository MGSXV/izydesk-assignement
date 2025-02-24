import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { handlePayment } from "./lib"
import { IProduct } from "@/types"

const PaymentForm = () => {

	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const { register, handleSubmit, formState: { errors }, reset } = useForm<any>()
	const location = useLocation();
	const { products } = location.state ||  { products: [] };

	const onSubmit = async (data: any) => {
		setIsLoading(true)
		const { name, email, address } = data
		const orderData = {
			name,
			email,
			address,
			products: products.map((product: IProduct) => product.id)
		}
		await handlePayment(orderData)
		setIsLoading(false)
		// reset()
		// navigate('/order-complete')
	}
	if (!products || products.length === 0) {
		navigate(-1);
	}

	const total = products.reduce((sum: any, product: IProduct) => sum + product.price, 0);

	return (
		<div className="w-full max-w-7xl mx-auto py-8 flex flex-col items-center">
			<div>
				<h1 className="text-2xl font-semibold">Payment</h1>
				<p className="text-muted-foreground">Please enter your payment information</p>
				<p>Total: {total}</p>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name <span className="text-destructive">*</span>
						</Label>
						<Input id="name" placeholder="Ex. Soufiane Elkhamlichi" className="col-span-3" disabled={isLoading}
							{...register("name", { required: true, minLength: 4, maxLength: 20})}
							aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email <span className="text-destructive">*</span>
						</Label>
						<Input id="email" placeholder="Ex. selkhamlichi97@gmail.com" className="col-span-3" disabled={isLoading}
							{...register("email", { required: true, minLength: 4, maxLength: 20, 
								pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							})}
							aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="address" className="text-right">
							Address <span className="text-destructive">*</span>
						</Label>
						<Input id="address" placeholder="Ex. Tangier 123, Morocco" className="col-span-3" disabled={isLoading}
							{...register("address", { required: true, minLength: 4, maxLength: 20})}
							aria-invalid={errors.name ? true : false } />
					</div>
				</div>
				<div className="w-full flex justify-between mt-8">
					<Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}
						className="w-1/2">
						Pay now
					</Button>
					<Button variant="secondary" onClick={() => navigate(-1)} disabled={isLoading}
						className="w-1/2">
						Cancel
					</Button>
				</div>
			</div>
		</div>
	)
}

export default PaymentForm