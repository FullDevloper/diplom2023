let onlineUsers = [];
export default function (socket,io){

    // user joins or opens the applicatio
    socket.on("join", (user) => {
        socket.join(user);
        //add joined user to online users
        if (!onlineUsers.some((u) => u.userId === user)) {
            console.log(` ${user} is olnline now`)
          onlineUsers.push({ userId: user, socketId: socket.id });
        }
        //send online users to frontend
        io.emit("get-online-users", onlineUsers);
        //send socket id
        // io.emit("setup socket", socket.id);
      });
        //socket disconnect
        socket.on("disconnect", () => {
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
            io.emit("get-online-users", onlineUsers);
          });
        
    // join conversation
    socket.on('join conversation',(conversation)=>{
        socket.join(conversation)
        console.log("user has joined conversation : ",conversation)
    })
      //typing
  socket.on("typing", (conversation) => {
    console.log(conversation,"typing")
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    console.log("stop typing",conversation)
    socket.in(conversation).emit("stop typing");
  });
socket.on("send message",(message)=>{
    console.log("messages---------->",message)
    let conversation =message.conversation;
    if(!conversation.users) return;
    conversation.users.forEach((user) => {
        if(user._id === message.sender._id) return
        socket.in(user._id).emit("receive message",message)
        
    });

})
}