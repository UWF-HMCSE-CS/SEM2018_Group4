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

// userSchema.pre('save', (next) =>{
//     var user = this;
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });
module.exports = mongoose.model('User', userSchema);