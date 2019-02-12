let socket =  io();
socket.on('connect',()=>{
    console.log('connected o server');
})
socket.on('disconnect',()=>{
    console.log('disconnect from server');
})
socket.on('newMessage',(message)=>{
    console.log(message);
})
socket.emit('createMessage',{from:'client',text:"That works for me"});