import express from 'express';
import db from '../db';
import { authors } from '../types';


const authorsRouter = express.Router();

authorsRouter.get('/', async(req, res)=>{
    try{
        const authors =await db.authors.getAll()
        res.json(authors);
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error getting all author"});
    }
});

authorsRouter.get('/:id', async(req, res)=>{
    const id=parseInt(req.params.id);
    try{
        const [authors] =await db.authors.getOne(id);

        if(!authors){
            res.status(404).json({message:"could not get author with that ID"});
            return;
        }
        res.json(authors)
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error getting that author"});
    }
});

authorsRouter.post('/', async(req, res)=>{
    try{
       const { email, name } = req.body;

        if (!email || typeof email !== "string" || email.length < 6 || email.length > 50) {
          res.status(400).json({ message: "Email's required and must be between 6 and 50 characters" });
        }

        if (!name || typeof name !== "string" || name.length < 2 || name.length > 20) {
          res.status(400).json({ message: "Name is required and must be between 2 and 20 characters" });
        }

        // DB code
    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error creating that user"});
    }
});

authorsRouter.put('/:id', async(req, res)=>{
    const id=parseInt(req.params.id);
    try{
        const { email, name } = req.body;
const results = await db.authors.update(id, { email, name });
        if (results.affectedRows===0){
            res.status(404).json({message:"could not update author with that ID"});
            return;

        }
        res.json({Message:"Successfully updated author!"});


    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error updating that author"});
    }
});

authorsRouter.delete('/:id', async(req, res)=>{
    const id=parseInt(req.params.id);
    try{
       const results= await db.authors.destroy(id);
        if (results.affectedRows===0){
            res.status(404).json({message:"could not delete author with that ID"});
            return;

        }
        res.json({Message:"Successfully deleted author!"});

    } catch (error) {
        console.log (error);
        res.status(500).json({message: "error deleting that author"});
    }
});
export default authorsRouter;
