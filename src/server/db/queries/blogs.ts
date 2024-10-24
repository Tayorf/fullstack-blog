import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { blogs } from "../../types";

const getAll =() => SelectQuery<blogs>('SELECT * from blogs');

const getOne =(id:number) => SelectQuery<blogs>('SELECT * from blogs WHERE id=?', [id])

interface NewBlogsObject {
    title: string;
    content: string
  }
  
const create = (newBlogs: NewBlogsObject) => ModifyQuery('INSERT INTO blogs SET ?', [newBlogs]);
const update = (id: number, updatedBlog: NewBlogsObject) => ModifyQuery('UPDATE blogs SET ? WHERE id=?', [updatedBlog, id]);
const destroy =(id:number) => ModifyQuery('DELETE from blogs WHERE id=?', [id]);

export default{
  getAll,
  getOne,
  create,
  update,
  destroy,
};