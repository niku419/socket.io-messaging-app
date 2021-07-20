const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

io.on("connection", socket => { 
  socket.on('message',({name, message}) =>{
    io.emit('message',{name,message})
  })
 });

httpServer.listen(3001,() => console.log("server started"));