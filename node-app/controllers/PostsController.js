const AppController = require('./AppController.js');
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
var PostsController = class PostsController extends AppController {

    /**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    **/

    constructor(model) {
        super(model);
        this.like = this.like.bind(this)
    }

    getAll(req, res, next){
        super.getAll(req, res, 
            (params) => {}, [
                {
                    path:'comments', 
                    populate : {path : 'user'/*, select: { 'email': 1, 'username': 1}*/ }
                }
            ]);
    }

    create(req, res, next) {
        super.create(req, res, (data) => {
            io.emit('notification', { 'message': 'Un nouvel article à été publié', 'data':  data});
        }, [])
    }

    like(data) {
        this._model.findOneAndUpdate({_id: data}, {$inc: {like: 1}}, function(err, po) {
            io.emit('liked', data)
        })
    }
    
}

module.exports = PostsController;
