import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000')

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  }

function createGame (gameName, playerName, handler) {
  socket.emit('createGame', {gameName, playerName})
  socket.on('gameLobbyState', response => handler(response))
}
function joinGame (gameName, playerName, handler) {
  socket.emit('joinGame', {gameName, playerName})
  socket.on('gameLobbyState', response => handler(response))
}
function startGame (handler) {
  socket.emit('startGame');
  socket.on('starTurn', (response) => handler(response))
}
function endTurn() {
  socket.emit('endTurn');
}
function listenForEndGame(handler) {
  socket.on('endGame', () => handler())
}
function pingLobby(handler, gameName) {
  socket.emit('lobbyPing', gameName);
  socket.on('gameLobbyState', response => handler(response));
}

export { createGame, joinGame, pingLobby, startGame }