import GameState from './models/GameState.js';
import Snake from './models/Snake.js';
import Apple from './models/Apple.js';
import LinkedNode from './models/LinkedNode.js';

let game = null;

window.addEventListener('DOMContentLoaded', prepareMenu);

function prepareMenu() {
  const newGameButton = document.querySelector('#new-game-button');
  newGameButton.addEventListener('click', startGame);
}

function hideMenu() {
  const menuElement = document.getElementById('menu');
  menuElement.style.display = 'none';
}

function showMenu() {
  const menuElement = document.getElementById('menu');
  menuElement.style.display = 'block';
}

function createStage(gameState) {
  const canvas = document.createElement('canvas');

  canvas.id = 'stage';
  canvas.height = gameState.stageHeight;
  canvas.width = gameState.stageWidth;
  canvas.style.border = '1px solid black';

  document.body.appendChild(canvas);
}

function startGame() {
  game = new GameState();

  const snake = new Snake(game);
  const apple = new Apple(game);

  createStage(game);

  game.addStateListener(GameState.IN_PROGRESS, () => {
    game.animationId = window.requestAnimationFrame(draw);
  });
  game.addStateListener(GameState.PAUSE, pauseGame);
  game.addStateListener(GameState.TERMINATED, stopGame);

  game.startWatchingPlayer(handleKeyUp);

  game.changeTo(GameState.IN_PROGRESS);

  hideMenu();
}

function pauseGame() {
  if (game.animationId) {
    window.cancelAnimationFrame(game.animationId);
  }
}

function stopGame() {
  pauseGame();

  game.removeAll();
  game.stopWatchingPlayer(handleKeyUp);
  game = null;

  showMenu();
}

function draw(timestamp) {
  if (game.state !== GameState.IN_PROGRESS) return;

  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, game.stageWidth, game.stageHeight);

  game.snake.update(timestamp);

  if (game.isAppleEaten()) {
    new Apple(game);
    game.snake.grow();
  }

  drawSnake(ctx, game.snake);
  drawApple(ctx, game.apple);

  game.animationId = requestAnimationFrame(draw);
}

// TODO: Implement the drawSnake function
function drawSnake(ctx, snake) {
  ctx.save();
  // start drawing
  ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';

  console.log(snake.coordinates);

  snake.coordinates.forEach(([x, y, width, height]) => {
    ctx.fillRect(x, y, width, height);
  });

  // end drawing
  ctx.restore();
}

function drawApple(ctx, apple) {
  ctx.save();
  // start drawing
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';

  const { left, top, size } = apple;
  ctx.fillRect(left, top, size, size);
  // end drawing
  ctx.restore();
}

function handleKeyUp(e) {
  const { snake } = game;
  const code = e.code;

  let newDirection = snake.previousDirection;

  switch (code) {
    case 'KeyQ':
      game.changeTo(GameState.TERMINATED);
      break;
    case 'KeyP':
      game.changeTo(GameState.PAUSE);
      break;
    case 'Enter':
      game.changeTo(GameState.IN_PROGRESS);
      break;
    case 'KeyW':
    case 'ArrowUp':
      newDirection = Snake.UP;
      break;
    case 'KeyD':
    case 'ArrowRight':
      newDirection = Snake.RIGHT;
      break;
    case 'KeyS':
    case 'ArrowDown':
      newDirection = Snake.DOWN;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      newDirection = Snake.LEFT;
      break;
    default:
      break;
  }

  if (newDirection !== snake.previousDirection) {
    snake.direction = newDirection;
  }
}
