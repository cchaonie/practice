export default class Apple {
  constructor(gameState) {
    this.gameState = gameState;
    this.size = 10;
    this.left = 0;
    this.top = 0;

    gameState.apple = this;
    this.gameState = gameState;
  }

  init() {
    this.left = Math.floor(Math.random() * this.gameState.stageWidth);
    this.top = Math.floor(Math.random() * this.gameState.stageHeight);
  }
}
