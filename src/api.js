import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function createGame(gameName, playerName, handler) {
  socket.emit('createGame', { gameName, playerName });
  socket.on('gameLobbyState', (response) => handler(response));
}
function joinGame(gameName, playerName, handler) {
  socket.emit('joinGame', { gameName, playerName });
  socket.on('gameLobbyState', (response) => handler(response));
}
function startGame() {
  socket.emit('startGame');
}
function endTurn() {
  socket.emit('endTurn');
}
function pingLobby(handler) {
  socket.emit('lobbyPing');
  socket.on('gameLobbyState', (response) => handler(response));
}
function listenForGameStarting(handler) {
  socket.on('gameStarting', () => handler());
}
function listenForTurnStarting(handler) {
  socket.on('startTurn', (response) => handler(response));
}
function listenForGameEnding(handler) {
  socket.on('endGame', () => handler());
}
function endLobby() {
  socket.emit('endLobby');
}
function killGame() {
  socket.emit('killGame');
}
function vote(name) {
  socket.emit('vote', name);
}

export {
  createGame,
  joinGame,
  pingLobby,
  startGame,
  listenForGameStarting,
  endLobby,
  listenForTurnStarting,
  endTurn,
  listenForGameEnding,
  killGame,
  vote,
};
