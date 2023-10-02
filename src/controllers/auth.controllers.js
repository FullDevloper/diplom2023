import { createUser } from "../services/auth.services.js";

export const register =async(req,res,next)=>{
 try{
    const {name,email,picture,status,password}=req.body;
    const newUser = await createUser({
      name,email,picture,status,password
    })
    res.json(newUser)
    res.status(200).send("Amjilttai")
 }  catch (error){
    next(error)

 } 
}