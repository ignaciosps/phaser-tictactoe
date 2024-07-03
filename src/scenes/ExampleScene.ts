import Phaser from "phaser";

export default class Example extends Phaser.Scene {
  constructor() {
    super("Example");
  }
  preload() {}
  create() {
    this.add.text(100, 100, "Test Example");
  }
  update() {}
}
