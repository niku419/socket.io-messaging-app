const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

io.on("connection", socket => { 
  socket.on('message',({name, message}) =>{
    io.emit('message',{name,message})
  })
 });

const port = process.env.PORT || 3001 
httpServer.listen(port,() => console.log("server started"));