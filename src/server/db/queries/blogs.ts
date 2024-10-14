import { Query } from "../connections";
import { IBlogsJoined, IBaseBlogs } from "../../types";

const getAll = () =>
	Query<IBlogsJoined[]>(`
SELECT 
	a.name, a.email, b.*, GROUP_CONCAT(t.name) as tagname, GROUP_CONCAT(t.id) as tagids
FROM 
	blogs b
JOIN 
	authors a ON a.id = b.author_id
LEFT JOIN
	blogtags bt ON bt.blog_id = b.id
LEFT JOIN 
	tags t ON bt.tag_id = t.id
GROUP BY b.id
`);
const getOne = (id: number) =>
	Query<IBlogsJoined[]>(
		`
SELECT 
	a.name, a.email, b.*, GROUP_CONCAT(t.name) as tagname, GROUP_CONCAT(t.id) as tagids
FROM 
	blogs b
JOIN 
	authors a ON a.id = b.author_id
LEFT JOIN
	blogtags bt ON bt.blog_id = b.id
LEFT JOIN 
	tags t ON bt.tag_id = t.id
WHERE
	b.id=?
GROUP BY b.id
`,
		[id]
	);
const create = (newBlog: IBaseBlogs) => Query("INSERT INTO Blogs SET ?", [newBlog]);
const update = (updatedBlog: IBaseBlogs, id: number) => Query("UPDATE Blogs SET ? WHERE id=?", [updatedBlog, id]);
const destroy = (id: number, author_id: number) => Query("DELETE FROM Blogs WHERE id=? and author_id =?", [id, author_id]);

export default {
	getAll,
	getOne,
	create,
	update,
	destroy,
};