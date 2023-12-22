// import mongoose from "mongoose"
import app from "./app.js"
import logger from "./configs/logger.js"
import { Server } from "socket.io"
import mongoose from "mongoose"
import SocketServer from "./SocketServer.js"

const PORT =process.env.PORT || 8001
mongoose.connection.on('error',(err)=>{
    logger.error("Өгөгдлийн сантай холбогдоход алдаа гарлаа...")
    process.exit(1)
})
let DATABASE_URI ='mongodb+srv://rentsen:Mongol976%401@cluster0.hdy4qnr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
console.log(process.env.DATABASE_URI)   
mongoose.connect(DATABASE_URI,{
    
    useNewUrlParser:true, 
    useUnifiedTopology:true
    
})
.then(()=>{
    logger.info("Aslaa")
})

const server = app.listen(PORT,()=>{
    logger.info(`Server is starting1 ${PORT}`);
  
})
// console.log(process.env.CLIENT_ENDPOINT,"client")
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", (socket) => {
    logger.info("socket io connected successfully.");
    // socket.on("sendMessage",(msg)=>{
    //     console.log("message sent to backend",msg)
    //     io.emit("receiveMessage",msg)
    // })
    SocketServer(socket, io);
    // SocketServer(socket)

  });
const exitHandler = () => {
    if (server) {
      logger.info("Server closed.");
      process.exit(1);
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
  
//   SIGTERM
  process.on("SIGTERM", () => {
    if (server) {
      logger.info("Server closed.");
      process.exit(1);
    }
  });