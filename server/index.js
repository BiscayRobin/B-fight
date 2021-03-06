const { SSL_OP_NO_TICKET } = require('constants');

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

const games = {};

const createRoom = () =>{
  if(waiting_queue.length>=2){
    const p1 = waiting_queue.shift();
    const p2 = waiting_queue.shift();
    grp=`${p1.id}:${p2.id}`;
    p1.join(grp);
    p2.join(grp);
    io.to(grp).emit('begin');
    games[grp]=2;
  }
};


io.on('connection',socket => {
  socket.on('end',score => {
    const it = socket.rooms.values();
    it.next();
    grp = it.next().value;
    socket.to(grp).emit('end',score);
    games[grp]--;
    if(games[grp]<=0){
      io.to(grp).emit('bye');
      if(games[grp]!=undefined){
        delete games[grp];
      }
    }
  });
  socket.on("disconnecting", reason => {
    const idx = waiting_queue.indexOf(socket);
    if(idx!=-1){
      waiting_queue.splice(idx,1);
    }else if(socket.rooms.length==2){
      const it = socket.rooms.values();
      it.next();
      grp = it.next().value;
      if(games[grp]>0)
        socket.to(grp).emit(error,`Opponent encountered this issue: ${reason}`);
        delete games[grp];
    }
  });
  waiting_queue.push(socket);
  createRoom();
});

server.listen(5000);
