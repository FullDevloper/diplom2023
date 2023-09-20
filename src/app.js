import express from "express"

import dotenv from "dotenv"
import morgan from "morgan";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors"
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
app.use(express.urlencoded({extended:true}))
app.use(ExpressMongoSanitize())
app.use(cookieParser())
app.use(compression())
app.use(fileUpload({
    useTempFiles:true
}))
app.use(cors({origin:"http://localhost:3000"}))
app.get('/',(req,res)=>{
    res.send("Helloo from server")
})
app.post('/test2',(req,res)=>{
   res.send(req.body.name)
}
)
export default app