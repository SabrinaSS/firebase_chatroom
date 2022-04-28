// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const createForm = document.querySelector('#modal-create');


// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList, rooms);
const chatroom = new Chatroom('GENERAL', username);



// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));

});

// add new room
//TODO: nest chats collection in rooms collection
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get new room name
  const newRoomForm = document.getElementById('new-room').value.trim().toUpperCase();
  chatUI.addNewRoom(newRoomForm);

  //add to list of rooms
  const html = `<button class="btn" id=${newRoomForm}>#${newRoomForm}</button>`;
  rooms.innerHTML += html;

  const newRoomMessage = `Welcome to the ${newRoomForm} room`;
  chatroom.updateRoom(newRoomForm);
  chatroom.addChat(newRoomMessage);

  //reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.clear();
});


// update name
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset form and display update message
    newNameForm.reset();
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

//update chatroom
rooms.addEventListener('click', e => {
    if(e.target.tagName == 'BUTTON'){
        auth.onAuthStateChanged(user =>{
            
            if(user){
                chatUI.clear();
                chatroom.updateRoom(e.target.getAttribute('id'));
                chatroom.getChats(chat => chatUI.render(chat));
              
            }else{
              console.log("user not logged in, unable to view other")
            }
          }), err => {
            console.log(err.message) 
         }; 
        
        
    }
});
