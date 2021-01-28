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
    socket.to(socket.rooms[0]).to(socket.rooms[1]).emit('end',score);
    console.log(socket.rooms[0]);
    console.log(socket.rooms[1]);
    console.log("envoie du end");
  });
  console.log('new player');
  console.log(socket.id);
  waiting_queue.push(socket);
  createRoom();
});

server.listen(5000);
