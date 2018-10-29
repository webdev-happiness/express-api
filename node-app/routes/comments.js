const express = require('express'),
routes = express.Router();


const CommentsController = new (require('../controllers/CommentsController.js'))(require('../models/comment.js'));

// CRUD FOR Lessons
routes.route('/comments/')
  .get(CommentsController.getAll)
  .post(CommentsController.create);

routes.route('/comments/:id')
  .get(CommentsController.getOne)
  .delete(CommentsController.delete)
  .put(CommentsController.update);



module.exports = routes;
