import { getRandom } from '../utils/index.js';
import LinkedNode from './LinkedNode.js';

export default class Snake {
  static UP = 0;
  static RIGHT = 1;
  static DOWN = 2;
  static LEFT = 3;

  constructor(gameState) {
    this.direction = Snake.RIGHT;

    this.speed = 50;

    this.head = null;
    this.paintStates = null;
    this.bodyLengthInDirections = null;
    this.coordinates = [];

    this.totalLength = 80;
    this.width = 10;

    gameState.snake = this;

    this.gameState = gameState;
    this.setInitialHeadCoordinates();
  }

  setInitialHeadCoordinates() {
    const x = getRandom(this.gameState.stageWidth - this.totalLength);
    const y = getRandom(this.gameState.stageHeight);

    this.head = {
      left: [x + this.totalLength, y],
      right: [x + this.totalLength, y + this.width],
    };
  }

  /**
   * Record all of the states of the snake when repaints, so there will be 60 nodes per
   * second. We need to think of a way to improve it, we should only record the states
   * that can cover the whole length of the snake.
   * @param {*} timestamp
   * @returns
   */
  update(timestamp) {
    const currentState = new LinkedNode({
      timestamp,
      direction: this.direction,
    });
    currentState.next = this.paintStates;
    this.paintStates = currentState;

    this.calculateBodyLengthInDirections();
  }

  /**
   * {timestamp: 6, direction: TOP} ->
   * {timestamp: 5, direction: TOP} ->
   * {timestamp: 4, direction: TOP} ->
   * {timestamp: 3, direction: Right} ->
   * {timestamp: 2, direction: Right} ->
   * {timestamp: 1, direction: Right}
   */
  calculateBodyLengthInDirections() {
    this.bodyLengthInDirections = null;

    let currentState = this.paintStates;
    // The first paint
    if (!currentState.next) {
      const bodyLengthInCurrentDirection = new LinkedNode({
        length: this.totalLength,
        direction: currentState.data.direction,
      });

      this.bodyLengthInDirections = bodyLengthInCurrentDirection;
    }

    let restLength = this.totalLength;

    while (currentState.next) {
      let nextTurningPoint = currentState.next;
      while (
        nextTurningPoint.next &&
        nextTurningPoint.next.direction === currentState.direction
      ) {
        nextTurningPoint = nextTurningPoint.next;
      }

      const deltaTime = currentState.timestamp - nextTurningPoint.timestamp;
      const distance = (deltaTime / 1000) * this.speed;

      const bodyLengthInCurrentDirection = new LinkedNode({
        length: Math.min(this.restLength, distance),
        direction: nextTurningPoint.data.direction,
      });
      bodyLengthInCurrentDirection.next = this.bodyLengthInDirections;
      this.bodyLengthInDirections = bodyLengthInCurrentDirection;

      restLength = Math.max(0, restLength - distance);

      if (restLength === 0) {
        break;
      }

      currentState = nextTurningPoint;
    }

    this.updateHeadCoordinates();

    this.display();
  }

  updateHeadCoordinates() {
    const head = this.head;
    const { data, next } = this.paintStates;
    if (!next) {
      return;
    }
    const { data: preData, next: preNext } = next;
    const distance = ((data.timestamp - preData.timestamp) / 1000) * this.speed;

    if (!preNext) {
      this.forward(data.direction, distance);
      return;
    }

    const isChangingDirection = preNext.data.direction !== preData.direction;

    if (isChangingDirection) {
      this.turnTo(preNext.data.direction, preData.direction, distance);
    }
  }

  turnTo(preDirection, newDirection, distance) {
    switch (preDirection) {
      case Snake.UP:
        switch (newDirection) {
          case Snake.RIGHT:
            this.head = {
              left: [head.left[0] + distance + this.width, head.left[1]],
              right: [head.right[0] + distance, head.right[1] - this.width],
            };
            break;
          case Snake.LEFT:
            this.head = {
              left: [head.left[0] - distance, head.left[1] + this.width],
              right: [head.right[0] - distance - this.width, head.right[1]],
            };
            break;
        }
        break;
      case Snake.RIGHT:
        switch (newDirection) {
          case Snake.UP:
            this.head = {
              left: [head.left[0] - this.width, head.left[1] - distance],
              right: [head.right[0], head.right[1] - distance - this.width],
            };
            break;
          case Snake.DOWN:
            this.head = {
              left: [head.left[0], head.left[1] + distance + this.width],
              right: [head.right[0] - this.width, head.right[1] + distance],
            };
            break;
        }
        break;
      case Snake.DOWN:
        switch (newDirection) {
          case Snake.RIGHT:
            this.head = {
              left: [head.left[0] + distance, head.left[1] - this.width],
              right: [head.right[0] + distance + this.width, head.right[1]],
            };
            break;
          case Snake.LEFT:
            this.head = {
              left: [head.left[0] - distance - this.width, head.left[1]],
              right: [head.right[0] - distance, head.right[1] - this.width],
            };
            break;
        }
        break;
      case Snake.LEFT:
        switch (newDirection) {
          case Snake.UP:
            this.head = {
              left: [head.left[0], head.left[1] - distance - this.width],
              right: [head.right[0] + this.width, head.right[1] - distance],
            };
            break;
          case Snake.DOWN:
            this.head = {
              left: [head.left[0] + this.width, head.left[1] + distance],
              right: [head.right[0], head.right[1] + distance + this.width],
            };
            break;
        }
        break;
    }
  }

  forward(direction, distance) {
    const head = this.head;
    switch (direction) {
      case Snake.UP:
        this.head = {
          left: [head.left[0], head.left[1] - distance],
          right: [head.right[0], head.right[1] - distance],
        };
        break;
      case Snake.RIGHT:
        this.head = {
          left: [head.left[0] + distance, head.left[1]],
          right: [head.right[0] + distance, head.right[1]],
        };
        break;
      case Snake.DOWN:
        this.head = {
          left: [head.left[0], head.left[1] + distance],
          right: [head.right[0], head.right[1] + distance],
        };
        break;
      case Snake.LEFT:
        this.head = {
          left: [head.left[0] - distance, head.left[1]],
          right: [head.right[0] - distance, head.right[1]],
        };
        break;
    }
  }

  grow() {
    this.totalLength += 10;
  }

  /**
   * how to show it on the screen
   * TODO implement this method
   */
  display() {
    const currentLengthInDirection = this.bodyLengthInDirections;
    if (!currentLengthInDirection.next) {
      const length = currentLengthInDirection.data.length;
      switch (currentLengthInDirection.data.direction) {
        case Snake.UP:
          this.coordinates = [
            [this.head.left[0], this.head.left[1], this.width, this.totalLength],
          ];
          break;
        case Snake.RIGHT:
          this.coordinates = [
            [
              this.head.left[0] - this.totalLength,
              this.head.left[1],
              this.totalLength,
              this.width,
            ],
          ];
          break;
        case Snake.DOWN:
          this.coordinates = [
            this.head.left[0] - this.width,
            this.head.left[1] - this.totalLength,
            this.width,
            this.totalLength,
          ];
          break;
        case Snake.LEFT:
          this.coordinates = [
            this.head.left[0],
            this.head.left[1] - this.width,
            this.totalLength,
            this.width,
          ];
          break;
      }
    } else {
      // TODO
    }
  }
}
