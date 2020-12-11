Socketio = require('socket.io');

const socket = Socketio( {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

socket.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
            }, interval);
        });
})

socket.listen(8000);
console.log('listening on 8000')