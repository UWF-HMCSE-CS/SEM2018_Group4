(()=> {
    var element = (id) =>{
        return document.getElementById(id);
    };

    var status = element('status');
    var messages = element('messages');
    var textarea = element('textarea');
    var username = document.getElementById('username').innerHTML;
    var clearBtn = element('clearBtn');

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
                    var message = document.createElement('div');
                    message.setAttribute('class', 'chat-message');
                    message.textContent = data[x].username+": "+data[x].message;
                    messages.appendChild(message);
                    messages.insertBefore(message, messages.firstChild);
                }
            }
            else{
                var message1 = document.createElement('div');
                message1.setAttribute('class', 'chat-message');
                message1.textContent = data.username+": "+data.message;
                messages.appendChild(message1);
                messages.insertBefore(message1, messages.firstChild);
            }
        });

        socket.on('status', (data) =>{
            setStatus((typeof data === 'object')? data.message : data);

            if(data.clear){
                textarea.value = '';
            }
        });

        textarea.addEventListener('keydown', (event) =>{
            //13 is return/enter key
            if(event.which == 13 && event.shiftKey == false){
                console.log('Keydowned');
                socket.emit('input', {
                    
                    username:username,
                    message:textarea.value
                });
                event.preventDefault();
            }

        });
        
        clearBtn.addEventListener('click', () =>{
            console.log('button clicked');
            socket.emit('clear');
        });

        socket.on('cleared', () =>{
            console.log('clearing');
            messages.textContent = '';
        });
    }
})();