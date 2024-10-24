import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { blogtags } from "../../types";

const getAll =() => SelectQuery<blogtags>('SELECT * from blogtags');
const getOne =(id:number) => SelectQuery<blogtags>('SELECT * from blogtags WHERE id=?', [id])

const create = (newPair: blogtags) => ModifyQuery('INSERT INTO blogtags SET ?', [newPair]);
const destroy = (blogtags_id: number) => ModifyQuery("DELETE FROM blogtags WHERE tag_id=?", [blogtags_id])

export default{
    getAll,
    getOne,
    create,
  };