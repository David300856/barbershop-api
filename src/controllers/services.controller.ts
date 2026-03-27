import { Request, Response } from "express";
import * as ServiceRepository  from "../repositories/services.repository";

export const getServices = async(req: Request, res: Response) => {

     try{
   
     const result = await ServiceRepository.getAllServices();
   
     res.json(
       result);
   
   }catch (error) {
     console.error(error);
     res.status(500).json({ error: "Database error" });
   }
};


export const createService = async (req: Request, res: Response) => {
    try{
      const { name, price, duration} = req.body;  
      const service = await ServiceRepository.createService(name, price, duration);
      res.status(201).json(service);

    }catch (error){
        console.error(error);
        res.status(500).json({ error: "Database error"});
    }

}

export const updateService = async (req: Request, res: Response) => {

    try{
        const { id } = req.params;
        const { name, price, duration } = req.body;
        const service = await ServiceRepository.updateService(Number(id), name, price, duration);

        if(!service){
            return res.status(404).json({ error: "Service not found" })

        }

         res.status(200).json(service);
    }catch (error){
        console.error(error);
        res.status(500).json({error: "Database error"});
    }}

    export const deleteService = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const service = await ServiceRepository.deleteService(Number(id));
            res.status(200).json(service);

            if(!service){
                return res.status(404).json({ error: "Service not found"})
            }

        }catch (error){
            console.error(error);
            res.status(500).json({error: "Database error"});
        }

    }
