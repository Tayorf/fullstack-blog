import * as passport from "passport";
import * as PassportLocal from "passport-local";
import * as ppjwt from "passport-jwt";
import { compareHash } from "../utils/passwords";
import db from "../db";
import config from "../config";

passport.use(
	new PassportLocal.Strategy(
		{
			usernameField: "email",
			session: false,
		},
		async (email, password, done) => {
			try {
				const [authorFound] = await db.authors.find("email", email);
				if (authorFound && compareHash(password, authorFound.password)) {
					done(null, { authorid: authorFound.id, email: authorFound.email });
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error);
			}
		}
	)
);
passport.use(
	new ppjwt.Strategy(
		{
			jwtFromRequest: ppjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.jwt.secret,
		},
		async (payload, done) => {
			done(null, payload);
		}
	)
);