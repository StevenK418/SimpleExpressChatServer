

const express = require('express');
const app = express();
const http = require('http').createServer(app);
//const io = require('socket.io')(http);


const cors = require('cors');
//Add CORS
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  const io = require("socket.io")(http, {
    cors: {
      origin: "*",
      methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
      credentials: false
    }
});
    // transports: ['websocket']
  //Pass in the options and call CORS
  app.use(cors(corsOptions));

io.on('connection', (socket) => {
    socket.on('join', function(data){
        socket.join(data.room);
        io.emit('new user joined', {user:data.user, message:'has joined  room.'});
      });
      socket.on('leave', function(data){
        io.emit('left room', {user:data.user, message:'has left room.'});
        socket.leave(data.room);
      });
    
     socket.on('message',function(data){
        io.in(data.room).emit('new message', {user:data.user, message:data.message});
      })
});

const PORT = 8081;
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});