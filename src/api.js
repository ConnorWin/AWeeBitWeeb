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
function runGame () {}
function endGame () {}

export { subscribeToTimer, createGame, joinGame }