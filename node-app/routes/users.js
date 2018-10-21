const express = require('express'), router = express.Router();

const UsersController = new (require('../controllers/UsersController.js'))(require('../models/user.js'));

//TESTING SECURE
router.get('/user', global.passport.authenticate('jwt', { session: false }), function(req, res){
    UsersController.getOne(req,res)
});

router.post('/user/register', function(req, res){
  UsersController.register(req,res)
});

router.post('/user/authentificate', function(req, res){
  UsersController.authentificate(req, res)
});

/*
router.post('/user/register', function(req, res) {
    if(!req.body.email || !req.body.password) {
      res.json({ success: false, message: 'Please enter email and password.' });
    } else {
      var newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({ success: false, message: 'That email address already exists.'});
        }
        res.json({ success: true, message: 'Successfully created new user.' });
      });
    }
});
*/

router.get("/secretDebug", function(req, res, next){
  console.log(req.get('Authorization'));
  next();
}, function(req, res){
  res.json("debugging");
});

module.exports = router;
