import * as jwt from "jsonwebtoken";
import config from "../../config";
import express from "express";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
	try {
		//Validate token.
		const bearerToken = req.headers.authorization?.split(" ");
		const token = bearerToken && bearerToken[0] === "Bearer" ? bearerToken[1] : null;
		if (!bearerToken || !token) {
			res.status(401).json({ message: "unauthorized!" });
			return;
		}
		const payload = <{ email: string }>jwt.verify(token, config.jwt.secret);
		res.json({ message: `You are now logged in as ${payload.email}` });
	} catch (error) {
		if (error) {
			res.status(500).json({ message: "Error logging in", error });
		}
	}
});

export default loginRouter;