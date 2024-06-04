import { getRandom } from '../utils.js';

export default class Snake {
  static UP = 0;
  static RIGHT = 1;
  static DOWN = 2;
  static LEFT = 3;

  constructor(gameState) {
    this.direction = Snake.UP;
    this.previousDirection = null;

    this.speed = 50;

    this.left = 0;
    this.top = 0;

    this.totalLength = 80;
    this.mainLength = 80;
    this.crossLength = 0;

    this.width = 10;

    gameState.snake = this;

    this.gameState = gameState;
    this.setInitialCoordinates();
  }

  setInitialCoordinates() {
    this.left = getRandom(this.gameState.stageWidth);
    this.top = getRandom(this.gameState.stageHeight - this.totalLength);
  }

  move(timestamp) {
    const { lastPaintTimestamp } = this.gameState;
    if (!lastPaintTimestamp) return;

    const distance = (this.speed * (timestamp - lastPaintTimestamp)) / 1000;
    return this.moveByDistance(distance);
  }

  moveByDistance(distance) {
    const { direction } = this;

    switch (direction) {
      case Snake.UP:
        this.moveUp(distance);
        break;
      case Snake.RIGHT:
        this.moveRight(distance);
        break;
      case Snake.DOWN:
        this.moveDown(distance);
        break;
      case Snake.LEFT:
      default:
        this.moveLeft(distance);
        break;
    }
  }

  moveUp(distance) {
    if (
      this.previousDirection === Snake.LEFT ||
      this.previousDirection === Snake.RIGHT
    ) {
      this.top -= distance;
      if (this.top < 0) {
        this.gameState.changeTo(GameState.TERMINATED);
      }
    }
  }

  moveRight(distance) {
    if (
      this.previousDirection === Snake.UP ||
      this.previousDirection === Snake.DOWN
    ) {
      this.left += distance;
      if (this.left > this.gameState.stageWidth) {
        this.gameState.changeTo(GameState.TERMINATED);
      }
    }
  }

  moveDown(distance) {
    if (
      this.previousDirection === Snake.LEFT ||
      this.previousDirection === Snake.RIGHT
    ) {
      this.top += distance;
      if (this.top > this.gameState.stageHeight) {
        this.gameState.changeTo(GameState.TERMINATED);
      }
    }
  }

  moveLeft(distance) {
    if (
      this.previousDirection === Snake.UP ||
      this.previousDirection === Snake.DOWN
    ) {
      this.left -= distance;
      if (this.left < 0) {
        this.gameState.changeTo(GameState.TERMINATED);
      }
    }
  }
}
