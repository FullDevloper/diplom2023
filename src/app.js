import express from "express"



const app =express();
app.get('/',(req,res)=>{
    res.send("Helloo from server")
})
export default app