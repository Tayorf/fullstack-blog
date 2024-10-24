import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { tags } from "../../types";

const getAll =() => SelectQuery<tags>('SELECT * from tags');
const getOne =(id:number) => SelectQuery<tags>('SELECT * from tags WHERE id=?', [id])

const create = (newPair:tags) => ModifyQuery('INSERT INTO tags SET ?', [newPair]);
const destroy = (tags_id: number) => ModifyQuery("DELETE FROM tags WHERE tag_id=?", [tags_id])

export default{
    getAll,
    getOne,
    create,
  };