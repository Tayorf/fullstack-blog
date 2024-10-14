import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";

interface DonateProps {}

const stripePromise = loadStripe("pk_test_51PLvct2KkY8YQy4emQShLiD5NTBvhIncX3IMctXPwCWQarmkaO6mPopdmAtYNPyOrtNGTcqTtrJ0reLAHHAQsz3l00d0ppNABA");

const Donate = (props: DonateProps) => {
	const [donation, setDonation] = useState({
		amount: "",
		show: true,
		clientSecret: "",
	});

	const handlePaymentInt = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/api/donate/payment-intent", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ amount: Number(donation.amount) }),
			});

			if (!res.ok) {
				throw new Error("res failed");
			}

			const { clientSecret } = await res.json();

			setDonation((pre) => ({ ...pre, show: false, clientSecret }));
		} catch (error) {
			console.log(error);
		}
	};

	if (donation.show) {
		return (
			<main className="container my-5">
				<section className="row justify-content-center">
					<div className="col-md-6">
						<h1 className="text-center mb-4 fw-bold">Make a Donation</h1>
						<form>
							<div className="form-group">
								<div className="form-label">Donation Amount</div>
								<input
									type="number"
									className="form-control"
									placeholder="$10"
									value={donation.amount}
									onChange={(e) => setDonation((prev) => ({ ...prev, amount: e.target.value }))}
								/>
							</div>
							<button type="button" className="btn btn-info mt-3" onClick={handlePaymentInt}>
								Continue to Checkout
							</button>
						</form>
					</div>
				</section>
			</main>
		);
	} else {
		return (
			<main className="container my-5">
				<section className="row justify-content-center">
					<div className="col-md-6">
						<h1 className="text-center mb-4 fw-bold">Payment Information</h1>
						<Elements stripe={stripePromise} options={{ clientSecret: donation.clientSecret }}>
							<CheckoutForm />
						</Elements>
					</div>
				</section>
			</main>
		);
	}
};

export default Donate;