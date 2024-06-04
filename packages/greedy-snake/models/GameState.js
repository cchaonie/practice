export default class GameState {
  static NOT_STARTED = 0;
  static IN_PROGRESS = 1;
  static PAUSE = 2;
  static TERMINATED = 3;

  constructor() {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    this.stageWidth = Math.min(600, pageWidth);
    this.stageHeight = Math.min(800, pageHeight);

    this.isHit = false;

    this.state = GameState.NOT_STARTED;
    this.stateListeners = [[], [], [], []];

    this.animationId = null;
    this.lastPaintTimestamp = null;

    this.snake = null;
    this.apple = null;
  }

  addStateListener(state, listener) {
    this.stateListeners[state].push(listener.bind(this));
  }

  removeStateListener(state, listener) {
    const listeners = this.stateListeners[state];
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  removeAll() {
    [
      GameState.NOT_STARTED,
      GameState.IN_PROGRESS,
      GameState.PAUSE,
      GameState.TERMINATED,
    ].forEach(state => {
      this.stateListeners[state] = [];
    });
  }

  changeTo(state) {
    const allowState = [
      [GameState.IN_PROGRESS],
      [GameState.PAUSE, GameState.TERMINATED],
      [GameState.TERMINATED, GameState.IN_PROGRESS],
      [],
    ];

    if (allowState[this.state].includes(state)) {
      this.state = state;

      for (const fn of this.stateListeners[this.state]) {
        fn();
      }
    }
  }

  /**
   * TODO implement this method
   * @returns whether the game is over
   */
  isGameOver() {
    return false;
  }
}
