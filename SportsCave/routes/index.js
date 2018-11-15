const express = require('express');
const router = express.Router();
const User = require('../model/User');
const cookieParser = require('cookie-parser');
var scripts = [{ script: '/javascripts/clientChat.js' }];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//displays our signup page
router.get('/signin', function(req, res){
  res.render('signin');
});

router.post('/login', function(req, res){
  var body = req.body;
  console.log(body);
  let user = new User({
    username: body.username,
    password: body.password,
  });
  User.findOne({ 'username': user.username, 'password': user.password }, (err, doc) =>{
      if(err){
        console.log('ERRROR: '+ err);
        throw err;
      }
      console.log(doc);
      if(doc != null){
        console.log(doc);
        res.cookie("user_name", user.username);
        res.render('chat', {title: 'chatRoom', scripts: scripts, user:doc});
        return;
      }
      console.log('invalid arguments');
      res.render('signin');
  });
});

router.post('/local-reg', function(req, res){
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
// //sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
// router.post('/local-reg', passport.authenticate('local-signup', {
//   successRedirect: '/',
//   failureRedirect: '/signin'
//   })
// );

// //sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/signin'
//   })
// );

// //logs user out of site, deleting them from the session, and returns to homepage
// router.get('/logout', function(req, res){
//   var name = req.user.username;
//   console.log("LOGGIN OUT " + req.user.username);
//   req.logout();
//   res.redirect('/');
//   req.session.notice = "You have successfully been logged out " + name + "!";
// });
module.exports = router;
