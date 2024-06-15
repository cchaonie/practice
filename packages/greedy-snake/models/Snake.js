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
        nextTurningPoint.next.data.direction === nextTurningPoint.direction
      ) {
        nextTurningPoint = nextTurningPoint.next;
      }

      const deltaTime =
        currentState.data.timestamp - nextTurningPoint.data.timestamp;
      const distance = (deltaTime / 1000) * this.speed;

      const bodyLengthInCurrentDirection = new LinkedNode({
        length: Math.min(restLength, distance),
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

    if (preNext) {
      const isChangingDirection = preNext.data.direction !== preData.direction;

      if (isChangingDirection) {
        this.turnTo(preNext.data.direction, preData.direction, distance);
        return;
      }
    }
    this.forward(data.direction, distance);
  }

  turnTo(preDirection, newDirection, distance) {
    const head = this.head;
    switch (preDirection) {
      case Snake.UP:
        switch (newDirection) {
          case Snake.RIGHT:
            this.head = {
              left: [head.left[0] + distance + this.width, head.left[1]],
            };
            break;
          case Snake.LEFT:
            this.head = {
              left: [head.left[0] - distance, head.left[1] + this.width],
            };
            break;
        }
        break;
      case Snake.RIGHT:
        switch (newDirection) {
          case Snake.UP:
            this.head = {
              left: [head.left[0] - this.width, head.left[1] - distance],
            };
            break;
          case Snake.DOWN:
            this.head = {
              left: [head.left[0], head.left[1] + distance + this.width],
            };
            break;
        }
        break;
      case Snake.DOWN:
        switch (newDirection) {
          case Snake.RIGHT:
            this.head = {
              left: [head.left[0] + distance, head.left[1] - this.width],
            };
            break;
          case Snake.LEFT:
            this.head = {
              left: [head.left[0] - distance - this.width, head.left[1]],
            };
            break;
        }
        break;
      case Snake.LEFT:
        switch (newDirection) {
          case Snake.UP:
            this.head = {
              left: [head.left[0], head.left[1] - distance - this.width],
            };
            break;
          case Snake.DOWN:
            this.head = {
              left: [head.left[0] + this.width, head.left[1] + distance],
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
        };
        break;
      case Snake.RIGHT:
        this.head = {
          left: [head.left[0] + distance, head.left[1]],
        };
        break;
      case Snake.DOWN:
        this.head = {
          left: [head.left[0], head.left[1] + distance],
        };
        break;
      case Snake.LEFT:
        this.head = {
          left: [head.left[0] - distance, head.left[1]],
        };
        break;
    }
  }

  grow() {
    this.totalLength += 10;
  }

  /**
   * how to show it on the screen
   */
  display() {
    this.coordinates = [];
    let currentLengthInDirection = this.bodyLengthInDirections;
    if (!currentLengthInDirection.next) {
      const length = currentLengthInDirection.data.length;
      switch (currentLengthInDirection.data.direction) {
        case Snake.UP:
          this.coordinates.push([
            this.head.left[0],
            this.head.left[1],
            this.width,
            this.totalLength,
          ]);
          break;
        case Snake.RIGHT:
          this.coordinates.push([
            this.head.left[0] - this.totalLength,
            this.head.left[1],
            this.totalLength,
            this.width,
          ]);
          break;
        case Snake.DOWN:
          this.coordinates.push([
            this.head.left[0] - this.width,
            this.head.left[1] - this.totalLength,
            this.width,
            this.totalLength,
          ]);
          break;
        case Snake.LEFT:
          this.coordinates.push([
            this.head.left[0],
            this.head.left[1] - this.width,
            this.totalLength,
            this.width,
          ]);
          break;
      }
    } else {
      let currentHead = this.head;
      while (currentLengthInDirection.next) {
        const preBodyLengthInDirection = currentLengthInDirection.next;
        switch (currentLengthInDirection.data.direction) {
          case Snake.UP:
            this.coordinates.push([
              currentHead.left[0],
              currentHead.left[1],
              this.width,
              currentLengthInDirection.data.length,
            ]);
            switch (preBodyLengthInDirection.data.direction) {
              case Snake.RIGHT:
                currentHead = {
                  left: [
                    currentHead.left[0] +
                      this.width -
                      preBodyLengthInDirection.data.length,
                    currentHead.left[1] - currentLengthInDirection.data.length,
                  ],
                };
                break;
              case Snake.LEFT:
                this.head = {
                  left: [
                    currentHead.left[0],
                    currentHead.left[1] - currentLengthInDirection.data.length,
                  ],
                };
                break;
            }
            break;
          case Snake.RIGHT:
            this.coordinates.push([
              currentHead.left[0] - currentLengthInDirection.data.length,
              currentHead.left[1],
              currentLengthInDirection.data.length,
              this.width,
            ]);
            switch (preBodyLengthInDirection.data.direction) {
              case Snake.UP:
                this.head = {
                  left: [
                    currentHead.left[0] -
                      currentLengthInDirection.data.length -
                      this.width,
                    currentHead.left[1],
                  ],
                };
                break;
              case Snake.DOWN:
                this.head = {
                  left: [
                    currentHead.left[0] -
                      currentLengthInDirection.data.length -
                      this.width,
                    currentHead.left[1] -
                      preBodyLengthInDirection.data.length +
                      this.width,
                  ],
                };
                break;
            }
            break;
          case Snake.DOWN:
            this.coordinates.push([
              currentHead.left[0] - this.width,
              currentHead.left[1] - currentLengthInDirection.data.length,
              this.width,
              currentLengthInDirection.data.length,
            ]);
            switch (preBodyLengthInDirection.data.direction) {
              case Snake.RIGHT:
                this.head = {
                  left: [
                    currentHead.left[0] - preBodyLengthInDirection.data.length,
                    currentHead.left[1] -
                      currentLengthInDirection.data.length -
                      this.width,
                  ],
                };
                break;
              case Snake.LEFT:
                this.head = {
                  left: [
                    currentHead.left[0] - this.width,
                    currentHead.left[1] -
                      currentLengthInDirection.data.length -
                      this.width,
                  ],
                };
                break;
            }
            break;
          case Snake.LEFT:
            this.coordinates.push([
              currentHead.left[0],
              currentHead.left[1] - this.width,
              currentLengthInDirection.data.length,
              this.width,
            ]);
            switch (preBodyLengthInDirection.data.direction) {
              case Snake.UP:
                this.head = {
                  left: [
                    currentHead.left[0] + currentLengthInDirection.data.length,
                    currentHead.left[1] + this.width,
                  ],
                };
                break;
              case Snake.DOWN:
                this.head = {
                  left: [
                    currentHead.left[0] + currentLengthInDirection.data.length,
                    currentHead.left[1] - preBodyLengthInDirection.data.length,
                  ],
                };
                break;
            }
            break;
        }

        currentLengthInDirection = currentLengthInDirection.next;
      }
    }
  }
}
