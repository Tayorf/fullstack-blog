import express from "express";
import db from "../../db";

const blogTagsRouter = express.Router();

// Get all blogtags
blogTagsRouter.get("/", async (req, res) => {
	try {
		const results = await db.blogtags.getAll();
		res.json(results);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot receive blogtags at this time" });
	}
});

export default blogTagsRouter;