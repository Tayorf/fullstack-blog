import * as jwt from "jsonwebtoken";
import Passport from "passport";
import db from "../../db";
import express from "express";
import config from "../../config";
import { generateHash } from "../../utils/passwords";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
	const newAuthor = req.body;
	try {
		newAuthor.password = generateHash(newAuthor.password);
		const result = await db.authors.insert(newAuthor);
		const token = jwt.sign({ authorid: result.insertId, email: newAuthor.email }, config.jwt.secret, { expiresIn: config.jwt.expires });
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "fix your code, register isnt working!", error });
	}
});

export default registerRouter;