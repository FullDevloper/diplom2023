import { createUser, signUser } from "../services/auth.services.js";
let Access_token="M8L1tJzIpUHhLRgvOXVWu7";
import { generateToken } from "../services/token.service.js";
let refresh_token="THE5i6XYF8gytYy6pbgSWC"
export const register =async(req,res,next)=>{
 try{
    const {name,email,picture,status,password}=req.body;
    const newUser = await createUser({
      name,email,picture,status,password
    })
    console.log(Access_token)
    const access_token=await generateToken({userId:newUser._id},"1d",Access_token)
    const ref_token=await generateToken({userId:newUser._id},"30d",refresh_token)
    res.cookie("refreshtoken",ref_token,{
      httpOnly:true,
      path:'/api/v1/auth/refreshtoken',
      maxAge:30*24*60*60*1000
    })
    console.table({ref_token,access_token})
    res.status(200).json({message:"success",data:newUser,access_token})
 }  catch (error){
    next(error)

 } 
}
export const login =async(req,res,next)=>{
   try{
      const {email,password}=req.body
      const user =await signUser(email,password)
      const access_token=await generateToken({userId:user._id},"1d",Access_token)
      const ref_token=await generateToken({userId:user._id},"30d",refresh_token)
      res.cookie("refreshtoken",ref_token,{
        httpOnly:true,
        path:'/api/v1/auth/refreshtoken',
        maxAge:30*24*60*60*1000
      })
      res.status(200).json({message:"success",data:user,access_token})
   }catch(error){
      next(error)
   }
 
}