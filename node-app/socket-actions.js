/* var Post = require('./models/post.js');
var Controller = require('./controllers/PostsController.js');
const PostsController = new Controller(Post);

// SOCKET.IO
module.exports = io.sockets.on('connection', function (socket) {
    io.emit('notification', { 'message': 'Bienvenue notre site web !', 'link':  '#'});

    // HIT ACTION
    socket.on('hit', function(data){
        console.log('Un user à cliqué sur hit !')
        PostsController.hit(data);
    });
}); */
