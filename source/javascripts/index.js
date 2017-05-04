import _ from "lodash";

import playerMove from "./player_move";
import opponentMove from "./opponent_move";
import palettes from "./palettes";

import { PLAYER_MARK, OPPONENT_MARK, otherMark } from "./marks";
import { appearTween, gameOverTween, paletteTween } from './tweens';

import {
  BOARD_SIZE,
  EMPTY_BOARD,
  BOARD_SPACES,
  boardSet,
  boardResult,
  boardWinnerSpaces
} from "./board";

const MOVE_FUNCTIONS = {
  [PLAYER_MARK]: playerMove,
  [OPPONENT_MARK]: opponentMove
};

let board, boardSprite, markSprites, palette, spaceKey;

let game = new Phaser.Game(380, 720, Phaser.AUTO, '', { preload, create });

function preload() {
  game.load.image('board', '/images/board.png');
  game.load.image(PLAYER_MARK, '/images/x.png');
  game.load.image(OPPONENT_MARK, '/images/o.png');
}

function create() {

  // Set the game background color
  palette = palettes.nextPalette();
  game.stage.backgroundColor = palette.background;

  // Add the board sprite
  boardSprite = game.add.sprite(0, 0, 'board');
  boardSprite.anchor.setTo(0.5, 0.5);
  boardSprite.position.setTo(game.world.centerX, game.world.centerY);
  boardSprite.tint = palette.board;

  // Scale the board so it properly fits in the canvas
  let scale = game.world.bounds.width / boardSprite.width * 0.9;
  boardSprite.scale.set(scale);

  // Register the space key
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

  spaceKey.onUp.add(() => {
    palette = palettes.nextPalette();
    paletteTween(game, boardSprite, _.compact(_.flatten(markSprites)), palette);
  });

  // Kick off the game
  reset(PLAYER_MARK);
}

function reset(mark) {

  // Set up the game logic objects
  board = EMPTY_BOARD;

  // Set up the container for the marks
  markSprites = _.times(BOARD_SIZE, () => []);

  // Kick off the game
  nextMove(board, mark);
}

// Loops the game, letting each player go in sequence
function nextMove(board, mark) {

  // Call the move function
  MOVE_FUNCTIONS[mark](board, boardSprite)

    // Add the mark
    .then(([ row, column ]) => {
      board = boardSet(board, row, column, mark);
      return addMarkSprite(row, column, mark)
    })

    // If the game is over, end the game. Otherwise, trigger the next move.
    .then(() => {
      if (!_.isNil(boardResult(board))) { return gameOver(board, mark); }
      nextMove(board, otherMark(mark));
    });
}

// Add a mark to the board as well as the sprite
function addMarkSprite(row, column, mark) {

  // Add the sprite
  let x = boardSprite.width / BOARD_SIZE * (column + 0.5) + boardSprite.left;
  let y = boardSprite.height / BOARD_SIZE * (row + 0.5) + boardSprite.top;

  let sprite = game.add.sprite(x, y, mark);
  markSprites[row][column] = sprite;

  sprite.scale = boardSprite.scale.clone();
  sprite.anchor.set(0.5);
  sprite.tint = palette.mark;

  // Tween the sprite
  return appearTween(game, sprite);
}

// Called when the game has ended.
function gameOver(board, mark) {

  let winnerSpaces = boardWinnerSpaces(board);

  let loserSpaces = BOARD_SPACES.filter(space => {
    return !_.some(winnerSpaces, _.partial(_.isEqual, space));
  });

  function mapSpacesToSprites(spaces) {
    return _(spaces)
      .map(([ row, column ]) => markSprites[row][column])
      .compact()
      .value();
  }

  let winnerSprites = mapSpacesToSprites(winnerSpaces);
  let loserSprites = mapSpacesToSprites(loserSpaces);

  palette = palettes.nextPalette();

  gameOverTween(game, boardSprite, winnerSprites, loserSprites, palette)
    .then(() => reset(otherMark(mark)));
}
