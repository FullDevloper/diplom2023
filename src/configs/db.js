import mongoose from "mongoose";
// const uri="mongodb+srv://rentsen:Mongol976@1@cluster0.hdy4qnr.mongodb.net/talks?retryWrites=true&w=majority&appName=AtlasApp"
const connectDB=async()=>{
    mongoose.set("strictQuery",false);
    const conn=await mongoose.connect(process.env.DATABASE_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    console.log(`MongoDb  холбогдлоо ${conn}`)
}
export default connectDB