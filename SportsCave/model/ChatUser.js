const mongoose = require('mongoose');  

const chatUserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    message: {type: String, required: true},
    chatName: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ChatUser', chatUserSchema);