import express from "express";
import loginRouter from "./login";
import registerRouter from "./register";
import { tokenCheck } from "../../middleware/tokencheck";

const authRouter = express.Router();

authRouter.use("/login", loginRouter);
authRouter.use("/register", registerRouter);
authRouter.get("/checkem", tokenCheck, (req, res) => {
	res.json(`Hello! ${req.user!.email}`);
});

export default authRouter;