(()=> {
    $(document).ready(function(){

    var element = (id) =>{
        return document.getElementById(id);
    };
    var textarea = element('newMessage');
    var sendMessageBtn = $('.send-message-btn');
    const chatBody   = $('#chatTitle');
    const loginButton= $('#wp-submit');
    const chat = $('.side-button');
    let userName =$('#userName');
    console.log('Name '+userName.textContent);
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

    const getChatBody = (data)=>{
        if(data.name === userName.text()){
            chatBody.append(
                `<li class="clearfix message sender">
                    <div class="chatUserName">${data.name}</div>
                    <div class="message">${data.message}</div>
                </li>`
            );
        }
        else{
            chatBody.append(
                `<li class="clearfix message reciever">
                    <div class="chatUserName">${data.name}</div>
                    <div class="message">${data.message}</div>
                </li>`
            );
        }
    };
    const outPutToChat = (data)=>{
        console.log('outputting', userName.text());
        if(data.length){
            for(var x = 0;x<data.length;x++){
                getChatBody(data[x]);
                // chatBody.append(
                //     `<li class="clearfix message Chat1">
                //         <div class="sender">${data[x].name}</div>
                //         <div class="message">${data[x].message}</div>
                //     </li>`
                // );
            }
            chatBody.scrollTop(chatBody[0].scrollHeight);
        }
        else{
            getChatBody(data);
            // chatBody.append(
            //     `<li class="clearfix message Chat1">
            //         <div class="sender">${data.name}</div>
            //         <div class="message">${data.message}</div>
            //     </li>`
            // );
            textarea.value = '';
            chatBody.scrollTop(chatBody[0].scrollHeight);            
        }
    };
    if(socket !== undefined){
        console.log('Connected to socket...');
        
        
        socket.on('output', (data) =>{
            console.log('outputCall', userName.text(), data);
            if(userName.val().length > 0){
                console.log(data);
                outPutToChat(data);
            }
            else{
                console.log('end');

                console.log(data);
                outPutToChat(data);
            }
        });
        
        const inputToSocket = () => {socket.emit('input', {
            username: userName.text(),
            message: textarea.value
        });};

        // textarea.addEventListener('keydown', (event) =>{
        //     //13 is return/enter key
        //     if(event.which == 13 && event.shiftKey == false){
        //         inputToSocket();
        //         event.preventDefault();
        //     }
        // });

        // const 
        // loginButton.click(() =>
        //     socket.emit('loginAttempt', loginName: loginPassword: )
        // );
        
        sendMessageBtn.click(()=>{
            userName = $('#userName');
            console.log(`UserName change...username: ${userName.text()}, u.val${userName.text()}, u.value${userName.value}, u.tc ${userName.textContent}, u.te ${userName.text}`);

            inputToSocket();
        });
    }else{
        console.log('Not connected to socket...');
    }
});
})();