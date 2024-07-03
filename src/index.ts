if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}

import "phaser";
import config from "./config/config";

class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

window.onload = function () {
  var game = new Game();
};
