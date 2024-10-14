import express from "express";

import apiRouter from "./apiRoutes";
import authRouter from "./authRoutes";

const router = express.Router();

router.use("/api", apiRouter);
router.use("/auth", authRouter);

export default router;