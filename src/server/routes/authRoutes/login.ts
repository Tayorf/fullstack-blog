import * as jwt from "jsonwebtoken";
import passport from "passport";
import express from "express";
import config from "../../config";

const loginRouter = express.Router();

loginRouter.post("/", passport.authenticate("local", { session: false }), async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "later nerd" });
	}

	try {
		const token = jwt.sign({ authorid: req.user.authorid, email: req.user.email }, config.jwt.secret, { expiresIn: config.jwt.expires });
		res.json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "fix your code, login isnt working!", error });
	}
});

export default loginRouter;