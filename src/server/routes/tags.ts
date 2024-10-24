import express from "express";
import db from "../db";
import { tags } from "../types";

const tagsRouter = express.Router();

tagsRouter.get('/', async(req, res)=>{
    try{
        const tags =await db.tags.getAll()
        res.json(tags);
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error getting all tags"});
    }
});

export default tagsRouter;