const mongoose = require('mongoose');  
const bcrypt = require('bcryptjs');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    email: {type: mongoose.SchemaTypes.Email, required: true, unique: true},
    username: {type: String, required: true, index: {unique: true}},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: Date, required: true},
    dateCreated: {type: Date, default: Date.now, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: false}
});

module.exports = mongoose.model('User', userSchema);