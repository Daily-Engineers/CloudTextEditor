module.exports = function(io){
    io.on('connection', function(socket){
      console.log('a user connected');
      socket.broadcast.emit('welcome', {msg:'hello, new dude!'});

      socket.on('text updating',(msg)=>{
         console.log(msg);
         socket.broadcast.emit('updated text',msg);
      });
    });
}
