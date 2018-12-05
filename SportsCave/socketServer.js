const socket = require('socket.io');
const mongoose = require('mongoose');
const ChatUser = mongoose.model('ChatUser');
const request = require('request');

const defaultChatName = 'Chat1';
var io = socket();
var socketApi = {};
socketApi.io = io;

io.on('connection', (socket) =>{
    ChatUser.find().limit(50).sort({__id:1}).then((res) =>
    {
        socket.emit('output', res);
    }).catch(function(error){
        console.log('Error getting the posts');
    });
    let dataToget;
    let encryptKey = Buffer.from("389c9cb2-7e84-4cb4-a0ec-b2fbaa:Apr231991").toString('base64')
    request({
        method: 'GET',
        uri: "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json",
        json: true,
        headers: {
          "Authorization": "Basic " + encryptKey
        },
        data: {  team:"miami-dolphins"  }
    },function (error, response, body) {
        // body is the decompressed response body
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
        console.log('the decoded data is: ' + body);
        let players = body.cumulativeplayerstats.playerstatsentry;
        console.log('players ', players);
        socket.emit('addSportsFeed', players);
      }
    );
       
    socket.on('input', (data) =>{
        let name = data.username;
        let message = data.message;
        console.log('recieved data'+data);
        if(name == '' || message == ''){
            //sendStatus('Please enter a name and message');
        } else{
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