function addUserToList(email){


    const id = document.getElementById('users_list');
    let li = document.createElement('li'); 
    li.innerHTML='\
    <div onclick="changeChatWindow(\''+email+'\')" class="d-flex bd-highlight">\
        <div class="img_cont">\
            <img src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg" class="rounded-circle user_img">\
            <span class="online_icon"></span>\
        </div>\
        <div class="user_info">\
            <span>'+email+'</span>\
            <p>'+email+' is online</p>\
        </div>\
    </div>\
';
    li.id=email;
    
    id.append(li); 

}
function addToGlobalObj(email){
    users[email]={msgs:[]};
}

function changeChatWindow(email){

    document.getElementById('chat_with').innerHTML=email.toUpperCase();
    const chatBox = document.getElementById('chat_box');
    chatBox.innerHTML="";
    activeChat=email;
    
    let innerBody = "";

    let msgs=users[email].msgs;


    for(let currentObj of msgs){

        if(currentObj.direction==1){

            innerBody+='	<div class="d-flex justify-content-start mb-4">\
            <div class="img_cont_msg">\
                <img src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg" class="rounded-circle user_img_msg">\
            </div>\
            <div class="msg_cotainer">\
               '+currentObj.text+'\
                <span class="msg_time">'+currentObj.recievedAt+', Today</span>\
            </div>\
        </div>';

        }else{

            innerBody+='<div class="d-flex justify-content-end mb-4">\
            <div class="msg_cotainer_send">\
            '+currentObj.text+'\
                <span class="msg_time_send">'+currentObj.sendAt+', Today</span>\
            </div>\
            <div class="img_cont_msg">\
        <img src=""  ><!-- brower user image -->\
            </div>\
        </div>';

        }

    }
    chatBox.innerHTML=innerBody; 



}

function sendMessage(element){
     if(activeChat=="")
     {
         alert("please select a reciever")
         return;
     }
     const textArea=document.getElementById('text_area');

    const text = textArea.value;
    const from = email;
    const to = activeChat;

     textArea.value="";
    socket.emit('sendMessage',{text,from,to})

    users[activeChat].msgs.push({
        direction:0,
        text:text,
        sendAt:new Date().toLocaleTimeString()
    });
    
    let div =  document.createElement('div');




   div.innerHTML= '<div class="d-flex justify-content-end mb-4">\
            <div class="msg_cotainer_send">\
            '+text+'\
                <span class="msg_time_send">'+new Date().toLocaleTimeString()+', Today</span>\
            </div>\
            <div class="img_cont_msg">\
        <img src=""  ><!-- brower user image -->\
            </div>\
        </div>'  ;

        document.getElementById('chat_box').append(div);

    
    
} 

const email = prompt("Enter your email")
let activeChat="";
document.getElementById('name').textContent=email;
var users={};
localStorage.setItem("email",email);
let socket =  io();
socket.on('connect',()=>{
    socket.emit('newConnection', {email: localStorage.getItem("email")});
})
socket.on('newUserJoined',(email)=>{

      addUserToList(email.email);
      addToGlobalObj(email.email);
    const msgs = users[email.email].msgs;
    


});
socket.on('disconnect',()=>{
    console.log('disconnect from server');
})
socket.on('recieveMessage',(message)=>{
     
    users[message.from].msgs.push({
        direction:1,
        text:message.text,
        recievedAt:new Date().toLocaleTimeString()
    });

    if(message.from==activeChat){

        
    let div =  document.createElement('div');




    div.innerHTML= '<div class="d-flex justify-content-start mb-4">\
             <div class="msg_cotainer_send">\
             '+message.text+'\
                 <span class="msg_time_send">'+(new Date().toLocaleTimeString())+', Today</span>\
             </div>\
             <div class="img_cont_msg">\
             </div>\
         </div>'  ;
 
         document.getElementById('chat_box').append(div);
         
    }



});
 

socket.on('givingUsers',(obj)=>{

    for(let email of obj){

        addToGlobalObj(email);
        addUserToList(email);

    } 

    console.log(users);
})


/*

class for maintaining user and their messages

*/
