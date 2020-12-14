Socketio = require('socket.io');

const socket = Socketio( {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

const currentGames = [];

socket.on('connection', (client) => {
  client.on('createGame', ({gameName, playerName}) =>{
    console.log(`creating game ${gameName} - ${playerName}`)
    const newGame = new Game(gameName,playerName);
    currentGames.push(newGame);
    client.emit('gameLobbyState', newGame);
  })
  client.on('joinGame', ({gameName, playerName}) => {
    console.log(`joining game ${gameName} - ${playerName}`);
    const game =currentGames.find((game) => game.name === gameName);
    game.players.push(playerName);
    client.emit('gameLobbyState', game);
  })
  client.on('runGame', (gameName) => {
    
  })
  client.on('endGame', (gameName) => {

  })
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
            }, interval);
        });
})

socket.listen(8000);
console.log('listening on 8000')

class Game {
  constructor(name, creator){
    this.players = [creator];
    this.name = name;
    this.currentPlayer = null;
  }
}