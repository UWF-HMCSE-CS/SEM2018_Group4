const socket = require('socket.io');
var io = socket();
var socketApi = {};
const mongoose = require('mongoose');
const ChatUser = mongoose.model('ChatUser');

const defaultChatName = 'Chat1';
socketApi.io = io;

io.on('connection', (socket) =>{
        ChatUser.find().limit(50).sort({__id:1}).then((res) =>
        {
            console.log('getChat',res);
            socket.emit('output', res);
        }).catch(function(error){
            console.log('Error getting the posts');
        });
    

    socket.on('input', (data) =>{
        let name = data.username;
        let message = data.message;
        console.log('recieved data'+data);
        if(name == '' || message == ''){
            //sendStatus('Please enter a name and message');
        } else{
            //io.emit('output', db.saveUser(name, message));
            let chatUser = new ChatUser({name: name, message: message, chatName: defaultChatName});
            console.log('chat user'+chatUser.name, chatUser.message);
            chatUser.save((err, chatUser) =>{
                if(err){
                    throw err;
                }
                console.log('chat save'+chatUser.name);
                io.emit('output', {username:chatUser.name, message: chatUser.message});

            });
        }
    });
});

module.exports = socketApi;