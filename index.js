const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/**
 * 
 * router
 * 
 */
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/joystick.html');
});

/**
 * socket io
 */
io.on('connection', function (socket) {
  console.log('a user connected -> ' + socket.id);
  socket.on('disconnect', function () {
    console.log('user disconnected-> ' + socket.id);
  });

  // send command for gaming
  socket.on('controls', function (msg) {
    io.emit('commands', msg);
  });

  // send message by joystick
  socket.on('die', function (msg) {
    console.log('-----------------------------------------', msg);
    
    io.emit('cli-die', msg);
  });
});

/**
 * server
 */
server.listen(3000, '192.168.0.23', function () {
  console.log('Example app listening on port 3000!');
});