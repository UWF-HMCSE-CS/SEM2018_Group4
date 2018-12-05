const express = require('express');
const router = express.Router();
const User = require('../model/User');
const chatUser = require('../model/ChatUser');
const cookieParser = require('cookie-parser');
var scripts = [{ script: '/javascripts/socketClient.js' }];

function loggedIn(req) {
  return !req.session || req.session.userId == undefined;
}

function determineLogin(req, res) {
  if (loggedIn(req)) {
    res.redirect('/login');
  }else{
    console.log('Here '+req.session.userId);
    res.render('index', {userName: req.session.userName});
  }
}
/* GET home page. */
router.get(/^\/(index)?$/, function(req, res, next) {  
  determineLogin(req, res);
});


router.get('/signup', function(req, res, next) {
  console.log('id '+req.session.userId);
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  
  res.render('login');
});
router.post('/performLogin', function(req, res){
  var body = req.body;
  console.log(body);
  let user = new User({
    username: body.log,
    password: body.pwd,
  });
  User.findOne({ 'username': user.username, 'password': user.password }, (err, doc) =>{
      if(err){
        console.log('ERRROR: '+ err);
        res.render('login', {ErrorMessage:'Error finding user', userName: undefined});
      }
      console.log(doc);
      if(doc != null){
        console.log(doc);
        req.session.userId = doc._id;
        req.session.userName = doc.username;
        console.log(req.session.userId);
        res.cookie("user_name", user.username);
        res.redirect('/');
      }else{
        console.log('invalid arguments');
        res.render('login', {ErrorMessage:'Error user not found', userName: undefined});
      }
  });
});

router.post('/signup', function(req, res){
  //Grab the request body
  var body = req.body;
  console.log('bod ',body);
  let user = new User({
    username: body.log,
    email: body.emailaddress, 
    firstName: body.fname,
    lastName: body.lname,
    birthday: body.birthDay,
    password: body.pwd,
  });
  let users = 0;
  User.count({ 'username': user.username, 'email': user.email }, (err, count) =>{
      if(err){
        res.render('login', {ErrorMessage:'Error fields were not validated', userName: undefined});
      }      
      users = count;
  });

  if(users > 0){
    res.render('login', {ErrorMessage:'Error user already exist', userName: undefined});
    return;
  }else{
    res.cookie("user_name", user.username);
    console.log(user.username);
    user.save((err, newUser) =>{
        if(err){
          res.render('login', {ErrorMessage:'Error fields were not validated', userName: undefined});
        }
        console.log('us ',user);
        req.session.userId = user._id;
        req.session.userName = user.username;
        console.log(req.session.userId);
        res.cookie("user_name", user.username);
        res.redirect('/');
    });
  }

}); 
module.exports = router;




