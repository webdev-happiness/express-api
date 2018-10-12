AppController = class AppController {
    /**
     * @param {Model} model The default model object
     * for the controller. Will be required to create
     * an instance of the controller
     */
    constructor(model) {
       this._model = model;
       this.create = this.create.bind(this);
       this.getAll = this.getAll.bind(this);

       this.getOne = this.getOne.bind(this);
       this.delete = this.delete.bind(this);
       this.update = this.update.bind(this);
    }

    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @return {Object} res The response object
     */
    create(req, res, next) {
        let obj = req.body;
        let temp = new this._model(obj);

        temp.save(function(err) {
            if (!err) {
                next(temp);
                return res.status(200).send(temp);
            } else {
                //console.log(err);
                return res.status(500).send(err);
            }
        });
    }

    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @param {Array} populate Table of Population
     * @return {Object} res The response object
     */
    getAll(req, res, next, populate = []){
        let populateQuery = populate;
        return this._model.find(function(err, data) {
            if (!err) {
                next(data);
                return res.status(200).send(data);
            } else {
                return res.status(500).send(err);
            }
        }).populate(populateQuery).exec();
    }

    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @return {Object} res The response object
     */
    getOne(req, res, next, populate = []){
        var id = req.params.id
        let populateQuery = populate;
        return this._model.findOne({_id: id}, function(err, data) {
          if (!err) {
              next(data);
              return res.status(200).send(data);
          } else {
              return res.status(500).send(err);
          }
        }).populate(populateQuery).exec();
    }

    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @return {Object} res The response object
     */
    delete(req, res, next){
        var id = req.params.id;

        this._model.remove({
          _id: id
        }, function(err, data) {
          if (err)
            res.status(500).send(err);
          res.json({ message: 'Successfully deleted' });
        });
    }

    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @return {Object} res The response object
     */
    update(req, res, next){
        var id = req.params.id;
        this._model.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, data) {
          if (err)
            res.status(500).send(err);
          res.json(data);
        });
    }
}

module.exports = AppController;
