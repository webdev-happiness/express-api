var Post = require('./models/post.js');
var Controller = require('./controllers/PostsController.js');
const PostsController = new Controller(Post);

const apiai = require('apiai')("fa942645d24d4d8ab286e6307090afb0");

// SOCKET.IO
module.exports = io.sockets.on('connection', function (socket) {
    console.log('new user')
    socket.emit('notification', { 'message': 'Bienvenue notre site web !', 'link':  '#'});

    // NOTIFICATIONS SYSTEM
      socket.on('like', function(data){
          console.log('Un user à cliqué sur hit !')
          PostsController.like(data);
      });

    // TCHAT SYSTEM
      const tchat_users = []
      const current_user = null

      socket.on('subscribe', (data) => {
        let newUser = {
          id: new Date(),
          ...data
        }

        current_user = newUser

        socket.emit('open_tchat', newUser) 

        tchat_users.push(current_user)

      })

      socket.on('disconnect', () => {
        if(current_user === null){
            return false
        }
        delete tchat_users[current_user.id];
        io.sockets.emit("deleteUsrFromList", current_user);
      })

      socket.on("message",function(data){
          console.log(data)
          if(current_user.name !== data.destinator){
            io.sockets.emit("reply", data);
          }
      });

}); 
