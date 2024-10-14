import type { RequestHandler } from "express";
import passport from "passport";
import { Payload } from "../types";

export const tokenCheck: RequestHandler = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err: any, tokenContents: Payload, info: any) => {
		if (err) {
			res.status(401).json({ message: "GTFO!" });
			return;
		}

		if (info) {
			res.status(401).json({ message: info.message });
			return;
		}

		if (!tokenContents) {
			res.status(401).json({ message: "Auth error please try again later" });
			return;
		}

		req.user = tokenContents;
		next();
	})(req, res, next);
};