const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express')
const app = express();

let server= http.createServer(app);
let io = socketIO(server);

const publicPAth =path.join(__dirname,'/../public');
const port =  process.env.PORT || 3000;
app.use(express.static(publicPAth));

io.on('connection',(socket)=>{

    console.log('new connection');

    socket.on('disconnect',()=>{

        console.log('user is disconnected')
    })

});

server.listen(port,()=>{console.log('app  is running at '+port)})