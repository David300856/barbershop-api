import { pool } from "../config/database";
export const getAllServices = async () => {
const result = await pool.query("SELECT * FROM services");
return result.rows;    
}