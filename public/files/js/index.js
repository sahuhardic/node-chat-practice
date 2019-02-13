email = prompt("Enter your email");
localStorage.setItem("email",email);
let socket =  io();
socket.on('connect',()=>{
    socket.emit('newConnection', {email: localStorage.getItem("email")});
})
socket.on('newUserJoined',(email)=>{

        const id = document.getElementById('users_list');
        let li = document.createElement('li'); 
        li.innerHTML='\
        <div class="d-flex bd-highlight">\
            <div class="img_cont">\
                <img src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg" class="rounded-circle user_img">\
                <span class="online_icon"></span>\
            </div>\
            <div class="user_info">\
                <span>'+email.email+'</span>\
                <p>'+email.email+' is online</p>\
            </div>\
        </div>\
    ';
        id.append(li);



});
socket.on('disconnect',()=>{
    console.log('disconnect from server');
})
socket.on('recieveMessage',(user)=>{
    console.log(user);
});
