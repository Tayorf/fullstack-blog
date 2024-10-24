import express from 'express';
import authorsRouter from './authors';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';

const indexRouter = express.Router();

indexRouter.use("/authors", authorsRouter);
indexRouter.use ("/blogs",blogsRouter );
indexRouter.use ("/tags", tagsRouter);
indexRouter.use ("/blogtags", blogtagsRouter);

export default indexRouter;