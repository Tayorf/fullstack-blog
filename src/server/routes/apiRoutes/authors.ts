import express from "express";
import db from "../../db";

const authorsRouter = express.Router();

// Get all authors
authorsRouter.get("/", async (req, res) => {
	try {
		const authors = await db.authors.getAll();
		res.json(authors);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error could not recieve all authors!" });
	}
});

// Get one author
authorsRouter.get("/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	if (!id || id < 1) {
		return res.status(400).json({ message: "Id must be a positive integer" });
	}

	try {
		const [author] = await db.authors.getOne(id);
		if (!author) {
			return res.status(404).json({ message: "Could not find author with that id" });
		}
		res.json(author);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error could not recieve all authors!" });
	}
});

// Create author
authorsRouter.post("/", async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const results = await db.authors.create({ name, email, password });
		return res.status(201).json({ message: "Author created!", id: results.insertId });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Could not create author!" });
	}
});

// Delete Author
authorsRouter.delete("/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	if (!id || id < 1) {
		return res.status(500).json({ message: "Id must be a positive integar." });
	}

	try {
		await db.authors.destroy(id);
		res.status(200).json({ message: `Successfully deleted author with the id of ${id}` });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot delete author at this time" });
	}
});

export default authorsRouter;