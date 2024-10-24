import express from 'express';
import authorsRouter from './authors';
import blogsRouter from './blogs';

const indexRouter = express.Router();

indexRouter.use("/authors", authorsRouter);

export default indexRouter;