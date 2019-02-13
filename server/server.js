const message=require('./utils/message');

const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express')
const app = express();
let server= http.createServer(app);
let io = socketIO(server);

const publicPAth =path.join(__dirname,'/../public');
const port =  process.env.PORT || 3000;
const myclients = [];
app.use(express.static(publicPAth));

io.on('connection',(socket)=>{
   
    socket.on('newConnection',(user,cb)=>{
    //console.log(io.sockets);
        socket.join(user.email); 
        socket.broadcast.emit('newUserJoined',{email:user.email});
        socket.emit('givingUsers',myclients);
        myclients.push(user.email);
        
    });

    socket.on('sendMessage',(user)=>{

        io.sockets.in(user.to).emit('recieveMessage', user);
    });

    // socket.on('createMessage',(message)=>{
    //     console.log('created message ',message );
    //     // io.emit('newMessage',{
    //     //     from:message.from,
    //     //     text:message
    //     // })
    //     socket.broadcast.emit('newMessage',{
    //         from:message.from,
    //         text:message,
    //         creaedAt:new Date().getTime()
    //     });
    // });

    socket.on('disconnect',()=>{

        console.log('user is disconnected')
    })

});

server.listen(port,()=>{console.log('app  is running at '+port)})