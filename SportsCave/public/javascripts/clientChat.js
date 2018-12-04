(()=> {
    $(document).ready(function(){

    var element = (id) =>{
        return document.getElementById(id);
    };
    var textarea = element('newMessage');
    var sendMessageBtn = $('.send-message-btn');
    const chatBody   = $('#chatTitle');
 
    var statusDefault = status.textContent;

    var setStatus = (s) =>{
        status.textContent = s;

        if(s != statusDefault){
            var delay = setTimeout(() =>{
                setStatus(statusDefault);
            }, 4000);
        }
    };
    var socket = io();

    if(socket !== undefined){
        console.log('Connected to socket...');
        
        socket.on('output', (data) =>{
            if(data.length){
                for(var x = 0;x<data.length;x++){
                    chatBody.append(
                        `<li class="clearfix message Chat1">
                            <div class="sender">${data[x].username}</div>
                            <div class="message">${data[x].message}</div>
                        </li>`
                    );
                }
                chatBody.scrollTop(chatBody[0].scrollHeight);
            }
            else{
                chatBody.append(
                    `<li class="clearfix message Chat1">
                        <div class="sender">${data.username}</div>
                        <div class="message">${data.message}</div>
                    </li>`
                );
                textarea.value = '';
                chatBody.scrollTop(chatBody[0].scrollHeight);            
            }
        });
        
        const inputToSocket = () => {socket.emit('input', {
            username: "Dcarter",
            message: textarea.value
        });};
        textarea.addEventListener('keydown', (event) =>{
            //13 is return/enter key
            if(event.which == 13 && event.shiftKey == false){
                inputToSocket();
                event.preventDefault();
            }
        });
        sendMessageBtn.click(()=>{
            inputToSocket();
        });
    }else{
        console.log('Not connected to socket...');
    }
});
})();