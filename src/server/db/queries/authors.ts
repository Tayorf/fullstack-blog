import { SelectQuery,ModifyQuery } from "../queryUtils";
import { authors } from "../../types";

const getAll =() => SelectQuery<authors>('SELECT * from authors');
const getOne =(id:number) => SelectQuery<authors>('SELECT * from authors WHERE id=?', [id]);

interface NewAuthorObject{
    email:string;
    name:string
};

const create = (newAuthor: NewAuthorObject) => ModifyQuery('INSERT INTO authors SET ?', [newAuthor]);
const update = (id:number, updatedAuthor: NewAuthorObject) => ModifyQuery('UPDATE authors SET ? WHERE id=?', [updatedAuthor, id]);
const destroy =(id:number) => ModifyQuery('DELETE from authors WHERE id=?', [id]);

export default{
    getAll,
    getOne,
    create,
    update,
    destroy,
  };