import createHttpError from "http-errors";
import validator from "validator";
import {UserModel} from "../models/index.js";
import bcrypt from "bcrypt"
export const createUser =async(userData)=>{
    const {name,email,picture,status,password}=userData;
    if(!name || !email || !password)
    {
        throw createHttpError.BadRequest("Та өөрийн нэр болон и-мэйл нууц үг оруулна уу?")
    }
    if(!validator.isLength(name,{
        min:2,
        max:16
    })){
        throw createHttpError.BadRequest("Та нэрээ оруулан уу? Хамгийн багадаа 2 тэмдэгт")
    }
    if(status && status.length>64)

    {
      
            throw createHttpError.BadRequest("Заавал бөглөнө үү.")
        
    }
    if(!validator.isEmail(email)){
        throw createHttpError.BadRequest("И-мэйл хаяг зөв оруулан уу?")
    }
    const checkDb =await UserModel.findOne({email})
    if(checkDb)
    {
        throw createHttpError(409,'Бүртгэлтэй')
    }
    // passcheck
    if(!validator.isLength(password,{
        min:6,
        max:128
    })){
        throw createHttpError.BadRequest("Нууц үг хамгийн багадаа 6 ихдээ 128 тэмдэгт орсон байх.")
    }
    const user =await  new UserModel({
        name,email,picture:picture || "",status:status || "users",password
    }).save()
 return user
}
export const signUser=async(email,password)=>{
    const user =await UserModel.findOne({email:email.toLowerCase()}).lean()
    if(!user)
    {
        throw createHttpError.NotFound("Бүртгэлгүй байна.")
    }
let passwordMatches=await bcrypt.compare(password,user.password)
if(!passwordMatches)
throw createHttpError.NotFound("Нууц үг буруу байна.")
return user
}