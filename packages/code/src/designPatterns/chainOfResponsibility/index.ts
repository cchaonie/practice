import { HandlerA, HandlerB, HandlerC, Handler, Request } from './types';

class Application {
  handlerChain: Handler | null = null;

  setHandlerChain(handler: Handler) {
    this.handlerChain = handler;
  }

  run() {
    const req = new Request('foo');
    this.handlerChain?.handle(req);
    console.log(req.tags);
  }
}

const app = new Application();

const handler1 = new HandlerA();
const handler2 = new HandlerB();
const handler3 = new HandlerC();

handler1.successor = handler2;
handler2.successor = handler3;

app.setHandlerChain(handler1);

app.run();
