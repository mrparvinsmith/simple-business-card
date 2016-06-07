var User = require('../models/user');
var controller = {};

controller.index = function(req, res){
  User.find({}, function(err, users){
    if(err) throw err;
    res.json(users);
  });
};

controller.create = function(req, res){
  User.findOne({username: req.body.username})
    .then(function(currentUser){
      if(currentUser){
        res.json({error: 'That user name is already taken.'});
      } else {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function(err){
          if (err) throw err;
          res.json(user);
        });
      }
    });
};

controller.show = function(req, res){
  res.json({message: 'this is user show'});
};

controller.update = function(req, res){
  res.json({message: 'this is user update'});
};

controller.destroy = function(req, res){
  res.json({message: 'this is user destroy'});
};

module.exports = controller;
