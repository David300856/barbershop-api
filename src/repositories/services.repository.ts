import { pool } from "../config/database";
export const getAllServices = async () => {
const result = await pool.query("SELECT * FROM services");
return result.rows;    
}

export const createService = async (name: string, price: number, duration: number) => {
    const result = await pool.query(
        "INSERT INTO services (name, price, duration) VALUES ($1, $2, $3) RETURNING *",
        [name, price, duration]
    );
    return result.rows[0]
}

export const updateService = async (id: number, name: string, price: number, duration: number ) =>{
    const result = await pool.query(
        "UPDATE services SET name = $1, price = $2, duration = $3 WHERE id = $4 RETURNING *",
        [name, price, duration, id]
    );
    return result.rows[0]
}   

export const deleteService = async (id: number) => {
    const result = await pool.query(
        "DELETE FROM services WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0]
}