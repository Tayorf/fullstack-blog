import { Query } from "../connections";
import { IBaseTags, Itags } from "../../types";

const getAll = () => Query<Itags[]>("SELECT * FROM tags");
const getOne = (id: number) => Query<Itags[]>("SELECT * FROM tags WHERE id=?", [id]);
const create = (newTag: IBaseTags) => Query("INSERT INTO tags SET ?", [newTag]);
const update = (updateTag: IBaseTags, id: number) => Query("UPDATE tags SET ? WHERE id=?", [updateTag, id]);
const destroy = (id: number) => Query("DELETE FROM tags WHERE id=?", [id]);

export default {
	getAll,
	getOne,
	create,
	update,
	destroy,
};