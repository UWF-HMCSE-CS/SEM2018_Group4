const mongoose = require('mongoose');
const ChatUser = mongoose.model('ChatUser');

module.exports = {
    getUser: (socket) =>{
        let userChats;
        ChatUser.find().limit(50).sort({__id:1}).then((res) =>
        {
            console.log('Rewsr',res);
            userChats = res;  });          
        // }).catch(function(error){
        //     console.log('Error getting the posts');
        // });
        return userChats;
    },

    saveUser: (name, message) =>{
        let chatUser = new ChatUser({name: name, message: message});
        console.log('chat user'+chatUser.name, chatUser.message);
        chatUser.save((err, chatUser) =>{
            if(err){
                throw err;
            }
            console.log('chat save'+chatUser.name);
            return {username:chatUser.name, message: chatUser.message};
            //io.emit('output', {username:chatUser.name, message: chatUser.message});

        });
    }
    
};


