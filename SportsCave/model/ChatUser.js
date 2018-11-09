const mongoose = require('mongoose');  

const chatUserSchema = new mongoose.Schema({
    name: String,
    message: String
});

module.exports = mongoose.model('ChatUser', chatUserSchema);