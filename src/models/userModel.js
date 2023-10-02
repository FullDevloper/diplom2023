import mongoose from "mongoose";
  import validator from "validator";
  import bcrypt from "bcrypt"
const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:[true,"Өөрийн нэр заавал оруулна уу?"]
    },
    email:{
        type:String,
        required:[true,"И-мэйл хаяг заавал оруулна уу?"],
        unqiue:[true,"Таны оруулсан и-мэйл хаяг бүртгэлтэй байна."],
        lowercase:true,
        validate:[validator.isEmail,"Та и-мэйл хаягаа зөв оруулна уу?"]
    }
    ,
    picture:{
        type:String,
        default:"",
    },
    status:{
        type:String,
        default:"Hey there ! I am using whatsapp"
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
        minLength:[6,"Хамгийн багадаа 6 тэмдэгт байна."],
        maxLemgth:[128,"Хамгийн ихдээ 128 тэмдэгт байна."]
    }
},
{
    collection:"users",
    timestamps:true
})
userSchema.pre("save",async function(next){
    try{
        if(this.isNew){
            const salt= await bcrypt.genSalt(12)
            const hashedPassword =await bcrypt.hash(this.password,salt)
            this.password = hashedPassword
        }
        next()
    }
    catch(error){
        next(error)
    }
})
const UserModel= mongoose.model("UserModel",userSchema)
export default UserModel