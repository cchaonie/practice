window.addEventListener("DOMContentLoaded", initStage);

const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;

const gameState = {
    stageWidth: Math.min(600, pageWidth),
    stageHeight: Math.min(800, pageHeight),
    isHit: false,
    state: 0, // 0 1 2 3 未开始 进行中（回车） 暂停（T） 终止（Q）
    animationId: null,
    stateListeners: [[], [], [], []],
    addStateListener(state, listener) {
        this.stateListeners[state].push(listener);
    },
    removeStateListener(state, listener) {
        const listeners = this.stateListeners[state];
        const index = listeners.indexOf(listener);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    },
    changeTo(state) {
        const allowState = [[1], [2, 3], [3, 1], []];

        if (allowState[this.state].includes(state)) {
            this.state = state;

            for (const fn of this.stateListeners[this.state]) {
                fn();
            }
        }
    },
};

const snake = {
    direction: 0, // 0,1,2,3 上右下左
    previousDirection: 0,
    speed: 50, // 每秒前进速度
    left: 0, // 头部x坐标
    top: 0, // 头部y坐标
    totalLength: 80,
    mainLength: 80, // 前进方向上的长度
    crossLength: 0, // 垂直于前进方向上的长度
    width: 10, // 宽度
    get distancePerFrame() {
        return (16.6 * this.speed) / 1000;
    },
    init() {
        this.left =
            Math.floor(
                Math.random() * (gameState.stageWidth - this.totalLength)
            ) + this.totalLength;
        this.top = Math.floor(Math.random() * gameState.stageHeight);
    },
    turn(direction) {
        const allowTurns = [
            [3, 1],
            [0, 2],
            [3, 1],
            [0, 2],
        ];
        const turns = allowTurns[this.direction];
        if (turns.includes(direction)) {
            this.previousDirection = this.direction;
            this.direction = direction;
            this.mainLength = 0;
            this.crossLength = this.totalLength;
        }
    },
};

const apple = {
    left: 0,
    top: 0,
    size: 10,
    init() {
        this.left = Math.floor(Math.random() * gameState.stageWidth);
        this.top = Math.floor(Math.random() * gameState.stageHeight);
    },
};

function initStage() {
    const canvas = document.createElement("canvas");

    canvas.id = "gameStage";
    canvas.height = gameState.stageHeight;
    canvas.width = gameState.stageWidth;
    canvas.style.border = "1px solid black";

    document.body.appendChild(canvas);

    initGame();
}

function initGame() {
    snake.init();
    apple.init();

    gameState.addStateListener(1, draw);
    gameState.addStateListener(2, pauseGame);
    gameState.addStateListener(3, stopGame);

    listenOperations();
}

function pauseGame() {
    if (gameState.animationId) {
        cancelAnimationFrame(gameState.animationId);
    }
}

function stopGame() {
    pauseGame();
    gameState.removeStateListener(1, draw);
    gameState.removeStateListener(2, pauseGame);
    gameState.removeStateListener(3, stopGame);
}

function draw() {
    if (gameState.state !== 1) return;

    const canvas = document.getElementById("gameStage");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, gameState.stageWidth, gameState.stageHeight);

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

                ctx.fillRect(
                    snake.left,
                    snake.top,
                    snake.width,
                    snake.mainLength
                );

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

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(appleLeft, appleTop, size, size);
    ctx.restore();

    requestAnimationFrame(draw);
}

function listenOperations() {
    window.addEventListener("keyup", e => {
        const isTurning = snake.direction !== snake.previousDirection;
        const code = e.code;

        switch (code) {
            case "KeyQ":
                gameState.changeTo(3);
                break;
            case "KeyT":
                gameState.changeTo(2);
                break;
            case "Enter":
                gameState.changeTo(1);
                break;
            case "KeyW":
            case "ArrowUp":
                if (!isTurning) {
                    snake.turn(0);
                }
                break;
            case "KeyD":
            case "ArrowRight":
                if (!isTurning) {
                    snake.turn(1);
                }
                break;
            case "KeyS":
            case "ArrowDown":
                if (!isTurning) {
                    snake.turn(2);
                }
                break;
            case "KeyA":
            case "ArrowLeft":
                if (!isTurning) {
                    snake.turn(3);
                }
                break;
            default:
                break;
        }
    });
}
