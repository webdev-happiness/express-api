const express = require('express'),
routes = express.Router();


const TodosController = new (require('../controllers/TodosController.js'))(require('../models/todo.js'));

// CRUD FOR Lessons
routes.route('/todos/')
  .get(TodosController.getAll)
  .post(TodosController.create);

routes.route('/todos/:id')
  .get(TodosController.getOne)
  .delete(TodosController.delete)
  .put(TodosController.update);



module.exports = routes;
