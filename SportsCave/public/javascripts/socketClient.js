(()=> {
    $(document).ready(function(){

    var element = (id) =>{
        return document.getElementById(id);
    };
    let chatTitle = $('.chat-title');
    var textarea = element('newMessage');
    var sendMessageBtn = $('.send-message-btn');
    let chatBody   = $('#chatTitle');
    const loginButton= $('#wp-submit');
    const chat = $('.side-button');
    let userName =$('#userName');
    console.log('Name '+userName.textContent);
    var statusDefault = status.textContent;

    chatTitle.click(()=>{
        $('#side-button').toggleClass('hide-chat');
    });
    var setStatus = (s) =>{
        status.textContent = s;

        if(s != statusDefault){
            var delay = setTimeout(() =>{
                setStatus(statusDefault);
            }, 4000);
        }
    };
    var socket = io();
    function appendToChat(belongsTo, data) {
        chatBody.append(`<li class="clearfix message ${belongsTo}">
            <div class="chatUserName">${data.name}</div>
            <div class="message">${data.message}</div></li>`
        );
    }
    function addSportsFeedToTable(players) {
        console.log(players);
        var out = "<tr><th>NO</th><th>NAME</th><th>POS</th></tr>";
        $.each(players, function (index, data) {
            out += '</td><td>' + data.player.JerseyNumber
                + '</td><td>' + data.player.FirstName + ' ' + data.player.LastName
                + '</td><td>' + data.player.Position
                + '</td></tr>';
        });
        document.getElementById("APICall").innerHTML = out;
    }
    function handleOutput(userName, data, outPutToChat) {
        console.log('outputCall', userName.text(), data);
        if (userName.val().length > 0) {
            console.log(data);
            outPutToChat(data);
        }
        else {
            console.log('end');
            console.log(data);
            outPutToChat(data);
        }
    }
    const getChatBody = (data)=>{
        let belongsTo = 'sender';
        if(data.name === userName.text()){
            belongsTo = 'sender';
        }else{
            belongsTo = 'reciever';            
        }
        appendToChat(belongsTo, data);
    };

    const outPutToChat = (data)=>{
        console.log('outputting', userName.text());
        if(data.length){
            for(var x = 0;x<data.length;x++){
                getChatBody(data[x]);
            }
            chatBody.scrollTop(chatBody[0].scrollHeight);
        }
        else{
            getChatBody(data);
            textarea.value = '';
            chatBody.scrollTop(chatBody[0].scrollHeight);            
        }
    };
    if(socket !== undefined){
        console.log('Connected to socket...');
        socket.on('output', (data) =>{
            handleOutput(userName, data, outPutToChat);
        });
        
        const inputToSocket = () => {
            socket.emit('input', {
                username: userName.text(),
                message: textarea.value
            });
        };

        sendMessageBtn.click(()=>{
            userName = $('#userName');
            console.log(`UserName change...username: ${userName.text()}, u.val${userName.text()}, u.value${userName.value}, u.tc ${userName.textContent}, u.te ${userName.text}`);
            inputToSocket();
        });

        socket.on('addSportsFeed', (players)=>{
            addSportsFeedToTable(players);
        });
        
    }else{
        console.log('Not connected to socket...');
    }
});
})();




