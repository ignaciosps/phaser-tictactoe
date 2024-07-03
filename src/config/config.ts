import Main from "../scenes/Main";
import Board from "../scenes/Board";
import GameOver from "../scenes/GameOver";
import Preloader from "../scenes/Preloader";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  scene: [Preloader, Main, Board, GameOver],
};

export default gameConfig;
