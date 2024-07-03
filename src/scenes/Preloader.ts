import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("Board", "assets/Board.png");
    this.load.image("X", "assets/X.png");
    this.load.image("O", "assets/O.png");
    this.load.image("Particle", "assets/Particle.png");
    this.load.audio("Tap", "assets/Tap.mp3");
    this.load.image("Reload", "assets/Reload.png");
    this.load.image("Play", "assets/Play.png");
    this.load.audio("Win", "assets/Win.mp3");
  }

  create() {
    this.scene.start("Main");
  }
}
