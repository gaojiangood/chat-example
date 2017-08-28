var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var usernum = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/index2', function(req, res){
  res.sendFile(__dirname + '/index2.html');
});

io.on('connection', function(socket){
  console.log('a user connected.');
  usernum++;
  io.emit('chat message', 'a user connected.usernum:'+usernum);
  socket.on('chat message', function(msg){
    console.log('message inputed :'+msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(socket){
    console.log('a user logouted.');
    usernum--;
    io.emit('chat message', 'a user logouted.usernum:'+usernum);
  });
});



http.listen(port, function(){
  console.log('listening on *:' + port);
});
