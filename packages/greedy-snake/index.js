import GameState from './models/GameState.js';
import Snake from './models/Snake.js';
import Apple from './models/Apple.js';

let game = null;

window.addEventListener('DOMContentLoaded', prepareMenu);

function prepareMenu() {
  const newGameButton = document.querySelector('#new-game-button');
  newGameButton.addEventListener('click', startGame);
}

function createStage(gameState) {
  const canvas = document.createElement('canvas');

  canvas.id = 'gameStage';
  canvas.height = gameState.stageHeight;
  canvas.width = gameState.stageWidth;
  canvas.style.border = '1px solid black';

  document.body.appendChild(canvas);

  const menuElement = document.getElementById('menu');
  menuElement.style.display = 'none';
}

function startGame() {
  const gameState = new GameState();
  game = gameState;

  const snake = new Snake(gameState);
  const apple = new Apple(gameState);

  createStage(gameState);

  gameState.addStateListener(GameState.IN_PROGRESS, () =>
    window.requestAnimationFrame(draw)
  );
  gameState.addStateListener(GameState.PAUSE, pauseGame);
  gameState.addStateListener(GameState.TERMINATED, stopGame);

  listenOperations(gameState);
  gameState.changeTo(GameState.IN_PROGRESS);
}

function pauseGame() {
  if (game.animationId) {
    cancelAnimationFrame(game.animationId);
  }
}

function stopGame() {
  pauseGame();
  game.removeAll();

  game = null;
}

function draw(timestamp) {
  const gameState = game;
  if (gameState.state !== GameState.IN_PROGRESS) return;

  const canvas = document.getElementById('gameStage');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, gameState.stageWidth, gameState.stageHeight);

  const { snake, apple } = gameState;

  const {
    left,
    top,
    speed,
    totalLength,
    mainLength,
    crossLength,
    direction,
    previousDirection,
  } = snake;

  snake.mainLength = Math.min(
    snake.mainLength + snake.distancePerFrame,
    snake.totalLength
  );

  snake.crossLength = Math.max(snake.crossLength - snake.distancePerFrame, 0);

  let isTurning = true;

  if (crossLength === 0) {
    snake.previousDirection = snake.direction;
    isTurning = false;
  }

  let newLeft = 0;
  let newTop = 0;

  switch (snake.direction) {
    case 0:
      newTop = snake.top - snake.distancePerFrame;
      if (newTop < 0) {
        gameState.changeTo(3);
      } else {
        snake.top = newTop;

        ctx.fillRect(snake.left, snake.top, snake.width, snake.mainLength);

        if (isTurning) {
          if (snake.previousDirection === 1) {
            ctx.fillRect(
              snake.left - snake.crossLength,
              snake.top + snake.mainLength - snake.width,
              snake.crossLength,
              snake.width
            );
          } else if (snake.previousDirection === 3) {
            ctx.fillRect(
              snake.left + snake.width,
              snake.top + snake.mainLength - snake.width,
              snake.crossLength,
              snake.width
            );
          }
        }
      }
      break;
    case 1:
      newLeft = snake.left + snake.distancePerFrame;
      if (newLeft > gameState.stageWidth) {
        gameState.changeTo(3);
      } else {
        snake.left = newLeft;

        ctx.fillRect(
          snake.left - snake.mainLength,
          snake.top,
          snake.mainLength,
          snake.width
        );

        if (isTurning) {
          if (previousDirection === 2) {
            ctx.fillRect(
              snake.left - snake.mainLength,
              snake.top - snake.crossLength,
              snake.width,
              snake.crossLength
            );
          } else if (previousDirection === 0) {
            ctx.fillRect(
              snake.left - snake.mainLength,
              snake.top + snake.width,
              snake.width,
              snake.crossLength
            );
          }
        }
      }
      break;
    case 2:
      newTop = snake.top + snake.distancePerFrame;
      if (newTop > gameState.stageHeight) {
        gameState.changeTo(3);
      } else {
        snake.top = newTop;

        ctx.fillRect(
          snake.left - snake.width,
          snake.top - snake.mainLength,
          snake.width,
          snake.mainLength
        );

        if (isTurning) {
          if (previousDirection === 1) {
            ctx.fillRect(
              snake.left - snake.crossLength - snake.width,
              snake.top - snake.mainLength,
              snake.crossLength,
              snake.width
            );
          } else if (previousDirection === 3) {
            ctx.fillRect(
              snake.left,
              snake.top - snake.mainLength,
              snake.crossLength,
              snake.width
            );
          }
        }
      }
      break;
    case 3:
      newLeft = snake.left - snake.distancePerFrame;
      if (newLeft < 0) {
        gameState.changeTo(3);
      } else {
        snake.left = newLeft;

        ctx.fillRect(
          snake.left,
          snake.top - snake.width,
          snake.mainLength,
          snake.width
        );

        if (isTurning) {
          if (previousDirection === 2) {
            ctx.fillRect(
              snake.left + snake.mainLength - snake.width,
              snake.top - snake.crossLength - snake.width,
              snake.width,
              snake.crossLength
            );
          } else if (previousDirection === 0) {
            ctx.fillRect(
              snake.left + snake.mainLength - snake.width,
              snake.top,
              snake.width,
              snake.crossLength
            );
          }
        }
      }
      break;
    default:
      break;
  }

  ctx.save();

  const { left: appleLeft, top: appleTop, size } = apple;

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(appleLeft, appleTop, size, size);
  ctx.restore();

  requestAnimationFrame(draw);
}

function listenOperations(gameState) {
  window.addEventListener('keyup', e => {
    const { snake } = gameState;
    const isTurning = snake.direction !== snake.previousDirection;
    const code = e.code;

    switch (code) {
      case 'KeyQ':
        gameState.changeTo(3);
        break;
      case 'KeyT':
        gameState.changeTo(2);
        break;
      case 'Enter':
        gameState.changeTo(1);
        break;
      case 'KeyW':
      case 'ArrowUp':
        if (!isTurning) {
          snake.turn(0);
        }
        break;
      case 'KeyD':
      case 'ArrowRight':
        if (!isTurning) {
          snake.turn(1);
        }
        break;
      case 'KeyS':
      case 'ArrowDown':
        if (!isTurning) {
          snake.turn(2);
        }
        break;
      case 'KeyA':
      case 'ArrowLeft':
        if (!isTurning) {
          snake.turn(3);
        }
        break;
      default:
        break;
    }
  });
}
