export default function (socket){

    // user joins or opens the applicatio
    socket.on("join",(user)=>{
        console.log("user has joined",user)
        socket.join(user)
    })
    // join conversation
    socket.on('join conversation',(conversation)=>{
        socket.join(conversation)
        console.log("user has joined conversation : ",conversation)
    })
}