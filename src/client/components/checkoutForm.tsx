import React from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface CheckoutFormProps {}

const CheckoutForm = (props: CheckoutFormProps) => {
	const stripe = useStripe();
	const elements = useElements();

	const handleDonateSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/thank-you`,
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			console.log(error.message);
		} else {
			console.log("Unexpected Error when submiting donation! See CheckoutForm component");
		}
	};

	return (
		<div>
			<PaymentElement />
			<button className="btn btn-info mt-3" onClick={handleDonateSubmit}>
				Donate!
			</button>
		</div>
	);
};

export default CheckoutForm;