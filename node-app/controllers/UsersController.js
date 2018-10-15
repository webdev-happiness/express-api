const AppController = require('./AppController.js');
const jwt = require('jsonwebtoken');
const config = require('../config/main.js');
const User = require('../models/user');

/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
var UsersController = class UsersController extends AppController {
   /**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
  */
   constructor(model) {
      super(model);
   }

   authentificate(req, res){
      this._model.findOne({
       email: req.body.email
     }, function(err, user) {
       if (err) throw err;

       if (!user) {
         res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
       } else {
         // Check if password matches
         user.comparePassword(req.body.password, function(err, isMatch) {
           if (isMatch && !err) { // Create token if the password matched and no error was thrown
             var payload = {id: user._id};
             var token = jwt.sign(payload, config.token, {
               expiresIn: 10080 // in seconds
             });
             res.status(200).send({ success: true, token: "bearer " + token, user:user });
           } else {
             res.status(401).send({ success: false, message: 'Authentication failed. Passwords did not match.' });
           }
         });
       }
     });
   }

   register(req, res){
     if(!req.body.email || !req.body.password) {
       res.json({ success: false, message: 'Please enter email and password.' });
     } else {

       var newUser = new User(req.body);

       // Attempt to save the user
       newUser.save(function(err) {
         if (err) {
           return res.json({ success: false, message: 'That email address already exists.'});
         }
         res.json({ success: true, message: 'Successfully created new user.' });
       });

     }
   }

   getOne(req, res){
     res.status(200).send(req.user);
   }


}

module.exports = UsersController;
