import createHttpError from "http-errors";
import { searchUser } from "../services/user.sevices.js";
export const searchUsers=async(req,res,next)=>{
    try{
        const keyword=req.query.search;
        if(!keyword)
        {
            throw createHttpError.BadRequest("Хайлтын утга оруулна уу?")
        }
        const users=await searchUser(keyword)
        res.status(200).json(users)
    }
    catch(error){


    }
}