import express from "express";
import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.stripe.apiKey, {
	apiVersion: "2024-04-10",
	typescript: true,
});

const donateRouter = express.Router();

donateRouter.post("/payment-intent", async (req, res) => {
	try {
		const amount = req.body.amount;
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: "USD",
		});
		res.json({
			msg: "payment intent created",
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Could not post payment", error });
	}
});

export default donateRouter;