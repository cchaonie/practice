import { Handler, Request } from './types';

class Application {
  handlers: Handler[] = [];

  addHandler(handler: Handler) {
    this.handlers.push(handler);
  }

  run() {
    const req = new Request('foo');
    for (let handler of this.handlers) {
      const continueHandling = handler(req);
      if (!continueHandling) {
        break;
      }
    }
  }
}

const app = new Application();

const handler1: Handler = (req: Request) => {
  console.log(`I am H1 and I am handling req: ${req.name}`);
  return true;
};

const handler2: Handler = (req: Request) => {
  console.log(`I am H2 and I am handling req: ${req.name}`);
  return true;
};

const handler3: Handler = (req: Request) => {
  console.log(
    `I am H3 and I am handling request: ${req.name}, none can handle this request after me`
  );
  return false;
};

app.addHandler(handler1);
app.addHandler(handler3);
app.addHandler(handler2);

app.run();
