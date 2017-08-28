var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
//var smartglass = require('./routes/smartglass');


//app.get('/smartglass', smartglass.smartglass);
app.get('/smartglass', function(req, res) {
    res.sendFile(__dirname + '/smartglass.html');
});

var usernum = 0;
io.on('connect', function(socket) {
    usernum++;
    console.log('a user connected.' + usernum);

    socket.on('disconnect', function(socket) {
        console.log('a user logouted.');
        usernum--;
    });
    socket.on('next', function(item) {
        console.log('next fired.from client' + item);
        io.emit('next',item);
    });

});



http.listen(port, function() {
    console.log('listening on *:' + port);
});
