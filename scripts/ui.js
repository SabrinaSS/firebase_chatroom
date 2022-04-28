// render chat templates to the DOM
// clear the list of chats (when the room changes)
class ChatUI{
    constructor(list, buttons){
        this.list = list;
        this.buttons = buttons;
        this.rooms = db.collection('rooms');

    }
    clear(){
       this.list.innerHTML = '';
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        )
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
            `;

            this.list.innerHTML += html;
    
        
    }
    
    displayButtons(){

        this.rooms.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var roomName = doc.data().room_name;
                    this.buttons.innerHTML += `<button class="btn" id="${roomName}">${roomName}</button>`;
                });
        });
    }

    clearButtons(){
        this.buttons.innerHTML = '';
    }


    async addNewRoom(newRoom){
        //format new object
        const roomObj = {
            room_name: newRoom
        };
        
        // save room document
        const response = await this.rooms.add(roomObj);
        return response;
    }
    
}