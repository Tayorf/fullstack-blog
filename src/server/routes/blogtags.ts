import express from "express";
import db from "../db";
import { blogtags } from "../types";

const blogtagsRouter = express.Router();

blogtagsRouter.get('/', async(req, res)=>{
    try{
        const blogtags =await db.blogtags.getAll()
        res.json(blogtags);
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error getting all blogtags"});
    }
});

export default blogtagsRouter;