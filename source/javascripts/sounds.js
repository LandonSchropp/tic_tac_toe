import _ from "lodash";

const SOUNDS = {
  x: "f3",
  o: "b4",
  xWin: "f3a3f4",
  oWin: "f3a3f2",
  draw: "f3a3f3"
};

const SOUND_NAMES = _.keys(SOUNDS);

let _game, sounds;

export default {

  preload(game) {
    _game = game;

    _.forEach(SOUNDS, (fileName, name) => {
      game.load.audio(name, [ `/sounds/${ fileName }.mp3` ]);
    });
  },

  create() {
    sounds = _(SOUND_NAMES)
      .map(name => [ name, _game.add.audio(name) ])
      .fromPairs()
      .value();
  },

  play(name) {
    sounds[name].play();
  }
};
