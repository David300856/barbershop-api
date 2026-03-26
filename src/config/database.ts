import { Pool } from "pg";

export const pool = new Pool({
    host:"localhost",
    port: 5432,
    user: "admin",
    password: "admin",
    database: "barbershop",
});

pool.connect()
    .then(() => { console.log("Connected to the database"); })
    .catch((err) => { console.error("Database connection error:", err); });



    