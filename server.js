const { isIfStatement } = require('typescript');

Socketio = require('socket.io');

const socket = Socketio( {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

let currentGame = null;

socket.on('connection', (client) => {
  client.on('createGame', ({gameName, playerName}) =>{
    console.log(`creating game ${gameName} - ${playerName}`)
    let newGame =  new Game(gameName,playerName);
    if(currentGame != null) {
      currentGame = newGame;
    } else {
      newGame = Error('Game already in progress');
    }
    client.emit('gameLobbyState', newGame);
  })
  client.on('joinGame', ({gameName, playerName}) => {
    console.log(`joining game ${gameName} - ${playerName}`);
    currentGame.players.push(playerName);
    client.emit('gameLobbyState', currentGame);
  })
  client.on('startGame', () => {
    // const {gameIndex, game} = findGame(gameName);

    currentGame.shufflePlayers();
    currentGame.shuffleDeck()
    currentGame.currentPlayer = 0;

    client.emit('starTurn', {player: currentGame.players[currentGame.currentPlayer], card: currentGame.deck[currentGame.currentCard]})
  })
  client.on('endTurn', () => {
    currentGame.currentCard++;
    if(currentGame.currentCard >= currentGame.deck.length) {
      client.emit('endGame');
      currentGame = null;
    } else {
      currentGame.currentPlayer = currentGame.currentPlayer >= currentGame.players.length - 1 ? 0 : currentGame.currentPlayer + 1;
      client.emit('startTurn', {player: currentGame.players[currentGame.currentPlayer], card: currentGame.deck[currentGame.currentCard]})
    }
  })
  client.on('lobbyPing', () => {
    let interval = setInterval(() => {
      client.emit(`gameLobbyState:`, currentGame);
    }, 1000)
    client.on(`endLobby`, () => {clearInterval(interval)})
  })
})

socket.listen(8000);
console.log('listening on 8000')

class Game {
  constructor(name, creator){
    this.creator = creator
    this.players = [creator];
    this.name = name;
    this.currentPlayer = -1;
    this.deck = [new Card('TypeA', 'what is it?'), new Card('TypeB', 'how are you?')];
    this.currentCard = 0;
  }

  shufflePlayers = () => {
    const plys = this.players;
    for (let i = plys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [plys[i], plys[j]] = [plys[j], plys[i]];
    }
    this.players = plys;
  }

  shuffleDeck = () => {
    const dek = this.deck;
    for (let i = dek.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dek[i], dek[j]] = [dek[j], dek[i]];
    }
    this.deck = dek;
  }
}

class Card{
  constructor( type, question){
    this.type = type;
    this.question = question;
  }
}