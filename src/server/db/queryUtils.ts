import pool from "./connections";
import type {ResultSetHeader} from "mysql2";

export const SelectQuery = async <T> (sqlString:string, values?:unknown[]) => {
	const [results] =await pool.query(sqlString, values);
	return results as T[];
};

export const ModifyQuery = async(sqlString: string, values?: unknown[]) =>{
	const [results] = await pool.query(sqlString, values);
	return results as unknown as ResultSetHeader;}