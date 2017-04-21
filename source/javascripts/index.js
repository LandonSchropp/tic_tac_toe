import _ from "lodash";

import Board from "./board";
import AIPlayer from "./ai_player";
import Player from "./player";

let board, boardSprite, players;

let game = new Phaser.Game(380, 720, Phaser.AUTO, '', { preload, create });

function preload() {

  // Load the images
  let images = {
    board3: "board3.png",
    board4: "board4.png",
    board5: "board5.png",
    o: "o.png",
    x: "x.png"
  };

  _.forEach(images, (path, key) => game.load.image(key, `/images/${ path }`));
}

function create() {

  // Add the board
  boardSprite = game.add.sprite(0, 0, 'board3');
  boardSprite.anchor.setTo(0.5, 0.5);
  boardSprite.position = game.world.bounds.size().multiply(0.5, 0.5);

  // Scale the board so it properly fits in the canvas
  let scale = game.world.bounds.width / boardSprite.width * 0.9;
  boardSprite.scale.setTo(scale, scale);

  // Set up the game board
  board = new Board(3);

  // Set up the players
  players = [
    new Player("x", board, boardSprite),
    new AIPlayer("o", board)
  ];

  // Kick off the game
  nextMove(players[0]);
}

// Determines the next player
function nextPlayer(currentPlayer) {
  return players[(_.findIndex(players, currentPlayer) + 1) % players.length];
}

// Loops the game, letting each player go in sequence
function nextMove(player) {

  // Kick off the move
  player.move((row, column, mark) => {

    // Add the mark to the board
    addMark(row, column, mark);

    // TODO: Recalculate the score
    // TODO: Check if the game is over

    // Triggler the next move
    nextMove(nextPlayer(player));
  })
}

// Add a mark to the board as well as the sprite
function addMark(row, column, mark) {
  board.set(row, column, mark);
  let x = boardSprite.width / board.size * column + boardSprite.left;
  let y = boardSprite.height / board.size * row + boardSprite.top;
  let sprite = game.add.sprite(x, y, mark);
  sprite.scale = boardSprite.scale;
}
