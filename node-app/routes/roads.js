const express = require('express'),
routes = express.Router();


const RoadsController = new (require('../controllers/RoadsController.js'))(require('../models/road.js'));

// CRUD FOR Lessons
routes.route('/roads/')
  .get(RoadsController.getAll)
  .post(RoadsController.create);

routes.route('/roads/:id')
  .get(RoadsController.getOne)
  .delete(RoadsController.delete)
  .put(RoadsController.update);



module.exports = routes;
