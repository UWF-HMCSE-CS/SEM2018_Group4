var express = require('express');
var router = express.Router();
var ChatUser = require('../model/ChatUser');
var User = require('../model/User');


var scripts = [{ script: '/javascripts/clientChat.js' }];

/* GET chat page. */
router.get('/', function(req, res, next) {
  User.findone({username: 'dcarter599'}, (err, user) => {
    res.render('chat', { title: 'chatRoom', scripts: scripts, user: User });
  });
});

module.exports = router;