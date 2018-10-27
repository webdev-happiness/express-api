const express = require('express'),
routes = express.Router();


const PostsController = new (require('../controllers/PostsController.js'))(require('../models/post.js'));

// CRUD FOR Lessons
routes.route('/posts/')
  .get(PostsController.getAll)
  .post(PostsController.create);

routes.route('/posts/:id')
  .get(PostsController.getOne)
  .delete(PostsController.delete)
  .put(PostsController.update);



module.exports = routes;
