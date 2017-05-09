import _ from "lodash";

const SOUNDS = [ "x", "o", "xWin", "oWin", "xDraw", "oDraw" ];

let _game, sounds;

export default {

  preload(game) {
    _game = game;
    SOUNDS.forEach(name => game.load.audio(name, [ `sounds/${ _.snakeCase(name) }.mp3` ]));
  },

  create() {
    sounds = _(SOUNDS)
      .map(name => [ name, _game.add.audio(name) ])
      .fromPairs()
      .value();
  },

  play(name) {
    sounds[name].play();
  }
};
