import { createUser, signUser } from "../services/auth.services.js";
let Access_token="M8L1tJzIpUHhLRgvOXVWu7";
import { generateToken } from "../services/token.service.js";
import { verify } from "../utils/token.utils.js";
let refresh_token1="THE5i6XYF8gytYy6pbgSWC"
// let access_tokenAuth="THE5i6XYF8gytYy6pbgSWC"
import { findUser } from "../services/user.sevices.js";
export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    console.log(email)
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });
    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      Access_token
    );
    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      refresh_token1
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({
      message: "register success.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
// export const register =async(req,res,next)=>{
//  try{
//     const {name,email,picture,status,password}=req.body;
//     console.log("aa",name)
//     const newUser = await createUser({
//       name,email,picture,status,password
//     })
//    //  console.log(Access_token)
//     const access_token=await generateToken({userId:newUser._id},"1d",Access_token)
//     const ref_token=await generateToken({userId:newUser._id},"30d",refresh_token)
//     res.cookie("refreshtoken",ref_token,{
//       httpOnly:true,
//       path:'/api/v1/auth/refreshtoken',
//       maxAge:30*24*60*60*1000
//     })
//     // console.table({ref_token,access_token})
//     res.status(200).json({message:"success",data:{...newUser,access_token}})
//  }  catch (error){
//     next(error)

//  } 
// }
export const login =async(req,res,next)=>{
   try{
      const {email,password}=req.body
      const user =await signUser(email,password)
      const access_token=await generateToken({userId:user._id},"1d",Access_token)
      const ref_token=await generateToken({userId:user._id},"30d",refresh_token1)
      res.cookie("refreshtoken",ref_token,{
        httpOnly:true,
        path:'/api/v1/auth/refreshtoken',
        maxAge:30*24*60*60*1000
      })
      console.log("amjilttai")
      res.status(200).json({message:"success",user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },})
   }catch(error){
      next(error)
   }
 
}
export const logout =async()=>{
   try{
// res.clearCookie('refreshtoken',{path:"api/v1/auth/refreshtoken"})
res.status(200).json({message:"log out"})
   }catch(error){

   }
}
export const refreshToken = async (req, res, next) => {
   try {
     const refresh_tokens = req.cookies.refreshtoken;
     console.log("ref",refresh_tokens)
     if (!refresh_tokens) throw createHttpError.Unauthorized("Please login.");
   
     const check = await verify(
       refresh_tokens,
       refresh_token
     );
     const user = await findUser(check.userId);
     const access_token = await generateToken(
       { userId: user._id },
       "1d",
       Access_token
     );
     res.json({
       user: {
         _id: user._id,
         name: user.name,
         email: user.email,
         picture: user.picture,
         status: user.status,
         token: access_token,
       },
     });
   } catch (error) {
     next(error);
   }
 };