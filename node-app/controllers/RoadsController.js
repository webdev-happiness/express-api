const AppController = require('./AppController.js');
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
var RoadsController = class RoadsController extends AppController {
   /**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    */
    constructor(model) {
        super(model);
    }

    getAll(req, res, next){
        super.getAll(req, res, (params) => {}, [{path:'user'}]);
    }

}

module.exports = RoadsController;
