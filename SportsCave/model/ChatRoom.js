const mongoose = require('mongoose');  

const chatRoom = new mongoose.Schema({
    chatName:{type: String, required: true},
    dateCreated: {type: Date, default: Date.now, required: true},
});

module.exports = mongoose.model('User', chatRoom);