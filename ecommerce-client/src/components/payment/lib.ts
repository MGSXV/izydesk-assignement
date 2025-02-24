import { axios } from "@/config/api";
import { loadStripe } from "@stripe/stripe-js";

export const handlePayment = async ({ name, email, address, products }: {
	name: string,
	email: string,
	address: string,
	products: string[]
}) => {
    try {
        const createResponse = await axios.post('/api/order/create-payment', {
            name,
			email,
			address,
			products,
        });
        
        const { clientSecret, orderId } = await createResponse.data;

        const stripe = await loadStripe('secretkey');
		if (!stripe) {
			throw new Error('Failed to load Stripe');
		}
        const { error } = await stripe.confirmPayment({
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/order-complete?order_id=${orderId}`,
            },
        });

        if (error) {
            throw new Error(error.message);
        }

    } catch (err) {
        console.error('Payment failed:', err);
    }
};