const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors:{
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
    credentials:false
  }
});

const waiting_queue = [];

console.log('Coucou');

const createRoom = () =>{
  if(waiting_queue.length>=2){
    console.log('creating room');
    const p1 = waiting_queue.shift();
    const p2 = waiting_queue.shift();
    p1.join(`${p1.id}:${p2.id}`);
    p2.join(`${p1.id}:${p2.id}`);
    io.to(`${p1.id}:${p2.id}`).emit('begin');
  }
};

io.on('connection',socket => {
  socket.on('end',score => {
    socket.to(socket.rooms[socket.rooms.size-1]).emit('end',score);
  });
  console.log('new player');
  waiting_queue.push(socket);
  createRoom();
});

server.listen(5000);