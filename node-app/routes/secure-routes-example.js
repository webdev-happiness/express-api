var express = require('express'),
apiRoute = express.Router();

apiRoute.use('/api', global.passport.authenticate('jwt', { session: false }));

/*
//POST
var Post = require('../models/post.js');
const PostsController = new (require('../controllers/PostsController.js'))(Post);


apiRoute.route('/api/post/')
  .get(PostsController.getAll)
  .post(PostsController.create);

apiRoute.route('/api/post/:id')
  .get(PostsController.getOne)
  .delete(PostsController.delete)
  .put(PostsController.update);
*/


module.exports = apiRoute;
