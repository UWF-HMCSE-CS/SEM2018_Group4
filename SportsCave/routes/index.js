const express = require('express');
const router = express.Router();
const User = require('../model/User');
const chatUser = require('../model/ChatUser');
const cookieParser = require('cookie-parser');
var scripts = [{ script: '/javascripts/clientChat.js' }];

/* GET home page. */
router.get('/', function(req, res, next) {  
  if(!req.session || req.session.userId == undefined){
    res.redirect('/login');
  }
  console.log('Here '+req.session.userId);
  res.render('index', {userName: req.session.userName});
});

router.get('/signup', function(req, res, next) {
  console.log('id '+req.session.userId);
  if(req.session.userId === undefined){
    res.redirect('/login');
  }
  res.render('/signup');
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
        throw err;
      }
      console.log(doc);
      if(doc != null){
        console.log(doc);
        req.session.userId = doc._id;
        req.session.userName = doc.username;
        console.log(req.session.userId);
        res.cookie("user_name", user.username);
        res.redirect('/');
        return;
      }
      console.log('invalid arguments');
      res.render('login', {ErrorMessage:'Error user not found', userName: undefined});
      return;
      //res.render('/signup');
  });
});

router.post('/register', function(req, res){
  //Grab the request body
  var body = req.body;
  console.log(body);
  let user = new User({
    username: body.username,
    email: body.emailaddress, 
    firstName: body.firstName,
    lastName: body.lastName,
    birthday: body.birthDay,
    password: body.password,
    avatar: body.avatar
  });
  let users = 0;
  User.count({ 'username': user.username, 'email': user.email }, (err, count) =>{
      if(err){
        throw err;
      }
      
      users = count;
  });

  if(users > 0){
    res.render('index', { title: 'Express' });
    return;
  }
  res.cookie("user_name", user.username);
  res.render('chat', {title: 'chatRoom', scripts: scripts, user:user});
  console.log(user.username);
  user.save((err, user) =>{
      if(err){
          throw err;
      }
    
    res.render('chat', {title: 'chatRoom', scripts: scripts, user:user});
  });
}); 
module.exports = router;
