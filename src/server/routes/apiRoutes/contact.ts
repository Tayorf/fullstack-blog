import express from "express";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import config from "../../config";

const mailgun = new Mailgun(FormData).client({
	username: "api",
	key: config.mailgun.apiKey,
});

const contactRouter = express.Router();

contactRouter.post("/", async (req, res) => {
	try {
		const newEmail = { ...req.body };
		const results = await mailgun.messages.create(config.mailgun.domain, {
			to: config.mailgun.toEmail,
			subject: newEmail.subject,
			from: newEmail.from,
			html: `<h1>${newEmail.message}</h1>`,
		});
		res.json(results);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot send email at this time", error });
	}
});

export default contactRouter;