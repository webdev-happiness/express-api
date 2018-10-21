//EXPRESS, OTHER IMPORT
const express = require('express');
const app = express();
var cors = require('cors');
var morgan = require('morgan');
var path = require('path');
var ip = require('ip');

const port = process.env.PORT || 3000;

var config = require('./config/main.js');

const mongoose = require('mongoose');
const io = require('socket.io')(app.listen(port));

// SOCKET ACTIONS
global.io = io; // GET io object from everywhere
var socketActions = require('./socket-actions.js');

//DB CONNECTION
mongoose.connect(config.database);
const db = mongoose.connecetion;
mongoose.connection.on('connected', function(){
  console.log('DB CONNECTED !!');
});
mongoose.connection.on('error', function(){
  console.log('DB ERROR !!');
});
mongoose.connection.on('disconnected', function(){
  console.log('DB DISCONNECTED');
});


// AUTORISER L'ACCES A L'ADMIN DE FAIRE DES REQUETES DEPUIS L'EXTERIEUR
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// PASSPORT PROTECTION USING STRATEGIES
global.passport = require('passport');
app.use(global.passport.initialize());
require('./config/passport')(global.passport);

//BODYPARSER
const bodyParser = require('body-parser'); //app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTE
var user = require('./routes/users.js');
//var api = require('./routes/secure-routes-example.js');
var roads = require('./routes/roads.js');
var todos = require('./routes/todos.js');
var events = require('./routes/events.js');



app.options('*', cors()); // Pour traiter le pre-flight provenant de l'exterieur (OPTIONS)

app.use(user);
app.use(roads);
app.use(todos);
app.use(events);

// LOG CONSOLE FOR NODEMON
app.use(morgan('dev'));
