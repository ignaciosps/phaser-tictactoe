if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}

import "phaser";
import config from "./config/config";
import ExampleScene from "./scenes/ExampleScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Example", ExampleScene);
    this.scene.start("Example");
  }
}

window.onload = function () {
  var game = new Game();
};
