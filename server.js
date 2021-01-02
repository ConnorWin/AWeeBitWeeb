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
    if(!currentGame) {
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
    currentGame.start();
    socket.emit('gameStarting');
    socket.emit('startTurn', {player: currentGame.players[currentGame.currentPlayer], newCard: currentGame.deck[currentGame.currentCard], cardsRemaining: currentGame.deck.length - (currentGame.currentCard + 1), totalCards: currentGame.deck.length })
  })
  client.on('endTurn', () => {
    currentGame.currentCard++;
    if(currentGame.currentCard >= currentGame.deck.length) {
      socket.emit('endGame');
      currentGame = null;
    } else {
      currentGame.currentPlayer = currentGame.currentPlayer >= currentGame.players.length - 1 ? 0 : currentGame.currentPlayer + 1;
      socket.emit('startTurn', {player: currentGame.players[currentGame.currentPlayer], newCard: currentGame.deck[currentGame.currentCard], cardsRemaining: currentGame.deck.length - (currentGame.currentCard + 1), totalCards: currentGame.deck.length})
    }
  })
  client.on('lobbyPing', () => {
    if(currentGame.hasStarted){
      socket.emit('gameStarting');
      socket.emit('startTurn', {player: currentGame.players[currentGame.currentPlayer], newCard: currentGame.deck[currentGame.currentCard], cardsRemaining: currentGame.deck.length - (currentGame.currentCard + 1), totalCards: currentGame.deck.length })
    } else {
      let interval = setInterval(() => {
        client.emit('gameLobbyState', currentGame);
      }, 2000)
      client.on(`endLobby`, () => {clearInterval(interval)})
    }
  })
  client.on('killGame', () => {
    socket.emit('endGame');
    currentGame = null;
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
    this.deck = [new Card('TypeA', "What is Luffy's middle intial? Drink 4 if you don't know.", 'QA','https://pm1.narvii.com/6297/150f8170e5f1637c7deed1dc6bd39f2a038a4b0c_00.jpg'), new Card('TypeB', 'Most likely to dye their heir an anime color? Most voted drinks 9.', 'QB','')];
    this.currentCard = 0;
    this.hasStarted = false;
  }

  start = () => {
    this.shufflePlayers();
    this.shuffleDeck()
    this.currentPlayer = 0;
    this.hasStarted = true;
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
  constructor(type, question, name, image){
    this.type = type;
    this.question = question;
    this.name = name;
    this.image = image;
  }
}