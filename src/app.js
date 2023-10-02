import express from "express"

import dotenv from "dotenv"
import morgan from "morgan";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser"
import createHttpError from "http-errors";
import cors from "cors"
import connectDB from "./configs/db.js";
// Routes
import routes from "./routes/index.js"
// import logger from "./configs/logger.js";
dotenv.config()

const app =express();
// Morgan
if(process.env.NODE_ENV !=="production")
{
    app.use(morgan("dev"))
}
// Helmet

app.use(helmet())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(ExpressMongoSanitize())
app.use(cookieParser())
app.use(compression())
app.use(cors())
// connectDB()

app.post('/test2',(req,res)=>{
   
    // res.send(req.body.name)
     throw createHttpError.BadRequest("this route errors",404)
 }
 )
app.use(async(error,req,res,next)=>{

    res.status(error.status || 500)
    res.send({
        error:{status:error.status || 500,
            message:error.message},
       
    })
})
app.use(fileUpload({
    useTempFiles:true
}))
// app.use(cors({origin:"http://localhost:3000"}))
app.get('/',(req,res)=>{
    res.send("Helloo from server")
})
app.use("/api/v1",routes)
export default app