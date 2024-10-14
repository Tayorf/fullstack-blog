import express from "express";
import db from "../../db";
import { IBaseTags } from "../../types";

const tagsRouter = express.Router();

// Get all tags
tagsRouter.get("/", async (req, res) => {
	try {
		const tags = await db.tags.getAll();
		res.json(tags);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot receive tags" });
	}
});

// Create tags
tagsRouter.post("/", async (req, res) => {
	const { name } = req.body;

	if (!name || typeof name !== "string" || name.length > 100) {
		return res.status(500).json({ message: "Name must be of type string and must be less than 100 characters" });
	}

	try {
		const newTag: IBaseTags = {
			name,
		};

		const tag = await db.tags.create(newTag);
		const tagId = tag.insertId;
		res.status(200).json({ message: "Successfully created tag!", id: tagId });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot create tags at this time" });
	}
});

// Delete tags
tagsRouter.delete("/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	if (!id || id < 1) {
		return res.status(500).json({ message: `Cannot delete tag, id must be an intager` });
	}

	try {
		await db.blogtags.destroy_by("tag_id", id);
		await db.tags.destroy(id);
		res.status(200).json({ message: `Successfully deleted tag with id of ${id}` });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Cannot delete tag with the id of ${id}` });
	}
});

export default tagsRouter;