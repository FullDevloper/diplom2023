// import mongoose from "mongoose"
import app from "./app.js"
import logger from "./configs/logger.js"

import mongoose from "mongoose"

const PORT =process.env.PORT || 8001
mongoose.connection.on('error',(err)=>{
    logger.error("Өгөгдлийн сантай холбогдоход алдаа гарлаа...")
    process.exit(1)
})
let DATABASE_URI ='mongodb+srv://rentsen:Mongol976%401@cluster0.hdy4qnr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
mongoose.connect(DATABASE_URI,{
    
    useNewUrlParser:true, 
    useUnifiedTopology:true
    
})
.then(()=>{
    logger.info("Aslaa")
})
app.listen(PORT,()=>{
    logger.info(`Server is starting1 ${PORT}`);
  
})


// const exitHandler =()=>{
//     if(server){
//         logger.info("Server closed 1")
//         process.exit(1)
//     }
//     else{
//         process.exit(1)
//     }
// }
// const unexpectedErrorHandler =(error)=>{
//     logger.error(error)
//     exitHandler()

// }
// process.on("uncaughtException",unexpectedErrorHandler)
// process.on("unhandledRejection",unexpectedErrorHandler)
// process.on("SIGTERM",()=>{
//     if(server){
//         logger.info("Server closed 1")
//         process.exit(1)
//     }
// })