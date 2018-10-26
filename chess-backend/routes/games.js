var express = require('express');
var router = express.Router();
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '630180',
  key: '2cc7e1dc6a9894677d00',
  secret: '1a18ea0eb8f838f84fd6',
  cluster: 'us2',
  encrypted: true
});

const games = {};
router.post('/', (req, res) => {
  const room = req.body.room;
  const white = req.body.whitePlayer;
  const black = req.body.blackPlayer;
  const newGame = {
    players: {
      [white]: 'white',
      [black]: 'black'
    },
    board: [
      ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
      ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
      ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
    ]
  };
  games[room] = newGame;
  res.send(newGame);
});
router.get('/:room', (req, res) => {
  const room = req.params.room;
  const game = games[room];
  if (game) {
    res.send(game);
  } else {
    res.status(404).send(`Game not found: ${room}`);
  }
});
router.post('/:room', (req, res) => {
  const room = req.params.room;
  const player = req.body.player;
  const fromRow = req.body.fromRow;
  const fromColumn = req.body.fromColumn;
  const toRow = req.body.toRow;
  const toColumn = req.body.toColumn;
  const game = games[room];
  if (game) {
    const piece = game.board[fromRow][fromColumn];
    const playerSide = game.players[player];
    if (piece == '  ') {
      res.status(400).send(`No piece in that square: ${fromRow}x${fromColumn}`);
    } else if (!playerSide) {
      res.status(400).send(`Not a player: ${player}`);
    } else if ((playerSide === 'white' && piece[0] !== 'W') || (playerSide === 'black' && piece[0] !== 'B')) {
      res.status(400).send(`Not your piece. Player=${playerSide}, Piece=${piece}`);
    } else {
      game.board[fromRow][fromColumn] = '  ';
      game.board[toRow][toColumn] = piece;
      res.send(game);
      pusher.trigger('game-' + room, 'board-updated', {});
    }
  } else {
    res.status(404).send(`Game not found: ${room}`);
  }
});
module.exports = router;
