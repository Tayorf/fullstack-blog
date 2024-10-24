import express from "express";
import db from "../db";
import { blogs } from "../types";

const blogsRouter = express.Router();

blogsRouter.get('/', async(req, res)=>{
    try{
        const chirps =await db.blogs.getAll()
        res.json(blogs);
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error getting all blogs"});
    }
});

blogsRouter.get('/:id', async(req, res)=>{
    const id=parseInt(req.params.id);
    try{
        const [blogs] =await db.blogs.getOne(id);

        if(!blogs){
            res.status(404).json({message:"could not get blogs with that ID"});
            return;
        }
        res.json( blogs)
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error getting that blog"});
    }
});

blogsRouter.post('/', async(req, res)=>{
    try{
       const { title, content } = req.body;

        if (!title || typeof title !== "string" || title.length < 6 || title.length > 50) {
          res.status(400).json({ message: "title is required and must be between 6 and 50 characters" });
        }

        if (!content || typeof content !== "string" || content.length < 3 || content.length > 200) {
          res.status(400).json({ message: "content is required and must be between 3 and 200 characters" });
        }

        // DB code
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error creating that blog"});
    }
});

blogsRouter.put('/:id', async(req, res)=>{
    const id=parseInt(req.params.id);
    try{
        const { title, content } = req.body;
const results = await db.blogs.update(id, { title, content });
        if (results.affectedRows===0){
            res.status(404).json({message:"could not update a blog with that ID"});
            return;

        }
        res.json({Message:"Successfully updated the blog!"});


    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error updating that blog"});
    }
});

blogsRouter.delete('/:id', async (req, res)=>{
    try{
       const id = parseInt(req.params.id);
       
       await db.blogtags.destroy(id);
      res.json({ message: "<Ice T voice>: Oh hell yeah" });
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error deleting the tags associated with that blog"});
    }
});

export default blogsRouter;