const express = require('express'),
routes = express.Router();


const EventsController = new (require('../controllers/EventsController.js'))(require('../models/event.js'));

// CRUD FOR Lessons
routes.route('/events/')
  .get(EventsController.getAll)
  .post(EventsController.create);

routes.route('/events/:id')
  .get(EventsController.getOne)
  .delete(EventsController.delete)
  .put(EventsController.update);



module.exports = routes;
