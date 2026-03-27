import express from "express";
import { pool } from "./config/database";
import { getAllServices } from "./repositories/services.repository"; 

const app = express();

app.use(express.json());

app.get("/services", async (req, res) => {

  try{

  const result = await getAllServices();

  res.json(
    result);

}catch (error) {
  console.error(error);
  res.status(500).json({ error: "Database error" });
}
}); 



app.post("/services", async (req, res) =>{

  try{

  const { name, price, duration } = req.body;
  
  const result = await pool.query(
  "INSERT INTO  services (name, price, duration) VALUES ($1, $2, $3) RETURNING *",
  [name, price, duration]
  );

  res.status(201).json(result.rows[0]);

}catch (error) {
  console.error(error);
  res.status(500).json({ error: "Database error." });
}
});




app.put("/services/:id", async (req, res) =>{

  try{
    const { id } = req.params;
    const { name, price, duration } = req.body;

  const result = await pool.query(
  "UPDATE services SET name = $1, price = $2, duration = $3 WHERE id = $4 RETURNING *",
  [name, price, duration, id]
  );

  if(result.rows.length === 0){
    return res.status(404).json({ error: "Servicio no encontrado" });
  }

  res.status(200).json(result.rows[0]);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Error de servidor" });

  }
   });


   app.delete("/services/:id", async (req, res) =>{

    try{
     const { id } = req.params;

     const result = await pool.query( 
      "DELETE FROM services WHERE id = $1 RETURNING *", [id]);

      if(result.rows.length === 0){
        return res.status(404).json({ error: "Servicio no encontrado" });
      }

      res.status(200).json({ message: "Servicio eliminado", service: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error de servidor" }); 
    }});

  

 const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});