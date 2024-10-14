import express from "express";
import db from "../../db";
import { IBaseBlogs, Tag } from "../../types";

const blogsRouter = express.Router();

// Get all blogs
blogsRouter.get("/", async (req, res) => {
	try {
		const blogs = await db.blogs.getAll();
		const clean_blogs = blogs.map((blog) => {
			let tags: Tag[] = [];
			if (blog.tagids) {
				const tag_ids = blog.tagids.split(",").map((id) => Number(id));
				const tag_names = blog.tagname!.split(",");

				tag_ids.forEach((tag_id, index) => {
					tags.push({ id: tag_id, name: tag_names[index] });
				});
				delete blog.tagids;
				delete blog.tagname;
			} else {
				tags = [];
			}

			return {
				...blog,
				tags,
			};
		});
		res.json(clean_blogs);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot recieve all blogs" });
	}
});

// Get one blog
blogsRouter.get("/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const [blog] = await db.blogs.getOne(id);

		let tags: Tag[] = [];

		if (blog.tagids) {
			const tag_ids = blog.tagids.split(",").map((id) => Number(id));

			if (!blog.tagname) return;
			const tag_names = blog.tagname!.split(",");

			tag_ids.forEach((tag_id, index) => {
				tags.push({ id: tag_id, name: tag_names[index] });
			});
			delete blog.tagids;
			delete blog.tagname;
		}

		res.json({ ...blog, tags });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot recieve blog with that id" });
	}
});

// Create blog
blogsRouter.post("/", async (req, res) => {
	const { title, content, tags } = req.body;

	if (!title || typeof title !== "string" || title.length > 150) {
		return res.status(400).json({ message: "Title must be a string no longer than 150 characters" });
	}

	if (typeof content !== "string") {
		return res.status(400).json({ message: "Content must be of type string" });
	}

	try {
		const newBlog: IBaseBlogs = {
			title,
			content,
			author_id: req.user!.authorid,
		};

		const blog = await db.blogs.create(newBlog);
		const blog_id = blog.insertId;

		if (tags || Array.isArray(tags)) {
			for await (const tag_id of tags) {
				await db.blogtags.create({ tag_id, blog_id });
			}
		}

		res.status(201).json({ message: "Successfully created blog!", id: blog_id });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot create blog at this time" });
	}
});

//Update blog
blogsRouter.put("/:id", async (req, res) => {
	const { title, content, tags } = req.body;
	const id = parseInt(req.params.id);

	try {
		const updateBlog: IBaseBlogs = {
			title,
			content,
		};

		const [blog] = await db.blogs.getOne(id);

		if (blog.author_id !== req.user!.authorid) {
			res.status(403).json({ message: "Dont touch shit that isnt yours!" });
			return;
		}

		if (tags || Array.isArray(tags)) {
			await db.blogtags.destroy_by("blog_id", id);
			for await (const tag_id of tags) {
				await db.blogtags.create({ tag_id, blog_id: id });
			}
		}

		await db.blogs.update(updateBlog, id);
		res.status(200).json({ message: "Successfully updated blog." });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot updated blog at this time" });
	}
});

//Delete blog
blogsRouter.delete("/:id", async (req, res) => {
	const id = parseInt(req.params.id);

	if (!id || id < 1) {
		return res.status(500).json({ message: "Id must be a positive integar." });
	}

	try {
		await db.blogtags.destroy_by("blog_id", id);
		await db.blogs.destroy(id, req.user!.authorid);
		res.status(200).json({ message: `Successfully deleted blog with the id of ${id}` });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Cannot delete blog at this time." });
	}
});

export default blogsRouter;