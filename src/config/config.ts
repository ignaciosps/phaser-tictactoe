import Main from "../scenes/Main";
import Board from "../scenes/Board";
import GameOver from "../scenes/GameOver";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  scene: [Main, Board, GameOver],
};

export default gameConfig;
