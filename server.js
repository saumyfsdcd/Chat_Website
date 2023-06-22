const bodyParser = require("body-parser");
const express=require("express");
const app=express();
const http=require("http")
const server = http.createServer(app);
// const { Server } = require("socket.io");
const { Server } = require("socket.io");
const io = new Server(server);

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

io.on("connection", (socket)=>{
    io.emit('user connected', "user connected")
    socket.on('chat message', (msg)=>{
        // console.log(msg)
        io.emit('chat message', msg);
    })

    socket.on('name', (nam)=>{
        io.emit('name', nam);
    })
})
const port=process.env.PORT || 3000;

server.listen(port, ()=>{
    console.log('server started on port 300')
})