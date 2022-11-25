## 理解 Redux

官方文档是这样说的：

> Redux is a predictable state container for JavaScript apps

翻译过来就是 `Redux` 是一个 `JavaScript` 应用的**可预测的状态管理器**。

那么，什么是状态？

### 状态是什么

这里用一个简单的例子来说明。
台灯我们都知道，它包含灯泡，开关。

- 打开开关，灯泡就会亮
- 关闭开关，灯就会灭

在这里，灯泡的**亮**和**灭**就是台灯的状态。

一个 `JavaScript` 应用，从本质上来讲，就是一个能够响应用户操作的东西，台灯也是。用稍显专业的说法，就是一个系统。台灯与开关构成了一个简单的系统。

在 `JavaScript` 应用中，每当用户进行了一个操作，这个应用都会给予反馈。

- 可以是展示一个动画
- 可以是打开新的页面
- 可以是请求一个列表
- ...

这时，我们就说这个应用的**状态发生了变化**。

### 为什么要 Redux

要回答这个问题，我们需要先知道 Redux 是什么。

#### Redux 是什么

本文开头就引用了官方文档中对 Redux 的概括——一个 `JavaScript` 应用的可预测的状态管理器。在理解了状态之后，我们大概猜测到，Redux 就是管理 `JavaScript` 应用的状态的工具，当与用户进行交互的时候，可以对状态进行修改。

同样，对照到台灯与开关这个系统，Redux 是这样的：

- 打开开关，Redux 把台灯的状态变成亮
- 关闭开关，Redux 把台灯的状态变成灭

也就是说，`JavaScript` 应用在完成后有一个初始状态，这时候没有跟用户交互——生下来就是这副模样，接下来的生命周期里，状态变化都由 Redux 来管理。

#### Redux 的优点是什么

为什么要用 Redux，就是要说明 Redux 解决的问题是什么。
还是台灯。
只有一个开关，一个台灯，这是一个很简单的系统，完全不需要用到 Redux 也没有问题。
但是如果有十个开关，一个台灯。有一种开关是按一下开，再按一下就关，再按一下又开......按着按着，我们就不能清楚地知道接下来按下一个开关，是不是能关闭台灯了。
在 `JavaScript` 应用中，如果又多个页面与同一个状态相关，而且这些页面又可以独立变化，那么就很难跟踪这个状态。Redux 就是为了解决这个问题。

Redux 是通过坚持以下三个原则来实现这一点的：

- 全局只有一个状态中心
     只有一个状态中心意味着所有需要用到这个状态的地方，都直接从这里获取状态，不需要自己再保存一个状态，省去了同步状态的过程。
- 状态是只读的
     只读意味着拿到什么就去渲染什么，这就避免了无意中修改状态导致的问题。想要修改状态，只能使用状态中心提供的方法。
- 只能通过纯函数来修改状态
     修改状态的方法由状态中心提供的纯函数——纯函数可以重复执行，同样的参数就会返回同样的结果。这就保证了对状态的修改是可跟踪的，这也是为什么 Redux 是可预测的。只能通过指定的方法修改状态，状态的变化只跟输入相关。因此，一旦确定了输入和修改方法，那么状态的结果就是可预测的了。

## Redux 的使用

根据 Redux 的三大原则——全局唯一性、只读性、纯函数(修改)性，我们首先来看看 Redux 的组成

### Redux 的组成

- Store
  既然是管理状态的工具，那么必须要有一个存储状态的地方，这个称为**Store**
- Reducer
  既然状态是只读的，必须要提供更新的接口，这个称为**Reducer**
- Action
  Reducer 只是提供了怎么去更新状态的接口，那什么时候调用 Reducer 呢——向 Store 发一个**Action**。Action 中指定了要调用的 Reducer 以及需要用来更新状态的数据

除了作为一个状态管理中心所必备的功能之外，Redux 还有以下特征：

- 作为一个观察者模式中的被观察对象
  实际上，观察者模式在这里被称为**发布——订阅模式**，即对状态感兴趣的页面，主动发出订阅请求，成为一个监听器。当状态中心里状态发生变化的时候，就会通知订阅者，执行监听器，相关的页面就会响应状态的变化。因此，Redux 提供了一个订阅方法，并且维护了一个监听器列表。

### 如何集成 Redux

Redux 本身是作为一个状态管理工具，并不是和 React 绑定的。而 React-Redux 就是一个把 React 和 Redux 绑定的工具。使用 React-Redux 只是因为它可以帮助我们更好地在 React 中使用 Redux，所以这里我们先考虑不使用中间件 React-Redux 的情况下，如何在 React 应用中使用 Redux。

通过对 Redux 的剖析，我们大致也能归纳出使用 Redux 的步骤：

- 分析应用中的状态是什么，即确定 Store 中的数据
- 状态有哪些变化，以及如何变，即确定 Reducer 和 Action
- 创建一个状态中心，即 Store
- 在页面上订阅 Store，即注册监听器
- 获取 Store 中的数据，并渲染 UI

### 使用

```javascript
// store.js 这里为了方便，将整个Store及reducer、action都放在了一个文件
import { createStore } from 'redux';
const initialState = {
  index: 0,
  todoList: [],
};
export default createStore((state = initialState, { type, payload = {} }) => {
  const { index, status } = payload;
  switch (type) {
    case 'NEW': {
      payload.key = state.index;
      payload.status = 'UNDONE';
      return {
        todoList: [...state.todoList, payload],
        index: state.index + 1,
      };
    }
    case 'DONE':
      return {
        todoList: state.todoList.map((todo, i) => {
          i === index ? (todo.status = 'DONE') : todo;
          return todo;
        }),
        index: state.index,
      };
    case 'UNDONE':
      return {
        todoList: state.todoList.map((todo, i) => {
          i === index ? (todo.status = 'UNDONE') : todo;
          return todo;
        }),
        index: state.index,
      };
    case 'TRASH':
      return {
        todoList: state.todoList.map((todo, i) => {
          i === index ? (todo.status = 'TRASH') : todo;
          return todo;
        }),
        index: state.index,
      };
    case 'RETRIVE':
      return {
        todoList: state.todoList.map((todo, i) => {
          i === index ? (todo.status = 'UNDONE') : todo;
          return todo;
        }),
        index: state.index,
      };
    default:
      return state;
  }
});

// app.js
import store from './store';

function listener() {
  console.log(store.getState());
}

store.subscribe(listener);
store.dispatch({
  type: 'NEW',
  payload: {
    key: 0,
  },
});
```

### 原理

#### enchancer

    1. applyMiddleware函数返回enhancer
    2. enhancer的关键在于增强了store的dispatch方法
    3. middleware的调用过程决定其结构

```js
function applyMiddleware(...middlewares) {
  return createStore =>
    (...args) => {
      const store = createStore(...args);
      const middlewareAPI = {
        getState,
        dispatch,
      };
      // 第一次：用 middlewareAPI 依次调用middleware，返回接受dispatch函数的函数
      const chain = middlewares.map(middleware => middleware(middlewareAPI));
      // 第二次：用compose构造middleware调用链，用store.dispatch调用middleware调用链，返回
      const dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
}

function compose(...fns) {
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

function middleware({ getState, dispatch }) {
  return next => action => {
    // 实际处理逻辑，调用next(action)让下一个 middleware 处理
    next(action);
  };
}
```

#### 触发更新

```js
// store内部属性
  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false

  1. store.subscribe(listener) --> currentListeners.push(listener)
  2. store.dispatch(action) --> reducer(currentState, action) --> for listener of currentListeners: listener()
  3. store.unscribe(listener) --> currentListeners.splice(indexOfListener, 1)
```

## store 的 api 有哪些？分别有何作用？

store.getState()
store.dispatch(action)
store.replaceReducer(newReducer)
store.subscribe(listener)
store 是 redux 暴露出来的一个对象，可以获取当前状态，可以发出改变状态的指令。那么 reducer 又在哪里呢，如何发生作用的呢？
reducer 是通过闭包 dispatch 函数的闭包存在的。当 store.dispatch 发出一个新的变更指令后，首先会使用闭包中的 reducer 去计算新的状态，然后用新的状态去调用监听器，达到通知更新的目的。
在运行时，通过 store.replaceReducer()可以动态地调整 reducer，基于这个特性，可以实现 reducer 的动态注入。

## applyMiddleware 函数的作用

applyMiddleware 是注入中间件到 redux 的接口，实际上是修改了原生的 store.dispatch 函数。在应用中，我们使用的 dispatch 函数其实是包装了中间件之后的版本，并非 redux 原生的 dispatch。

## 为什么 middleware 的签名是 store => next => action

applyMiddleware 处理中间件时，首先会传入 store，这样中间件就能够获取当前状态了。之后，applyMiddleware 会使用 compose 把 next => action 组合起来，通过 Array#reducer 函数组合起来，这样从左到右传入的 middleware 会从右到左嵌套调用，next 在运行时就是上一个中间件，而最后一个中间件接收的 next 才是真正的 redux 原生的 dispatch 函数。因此，在 middleware 中调用 next(action)，其实就是在让后续的 middleware 有机会处理 action。

## 中间件

中间件存在的价值在于解耦。当 client 向 server 发起请求之后，并不关注实际的请求是如何被处理、被谁处理，client 关注的是结果。

这种请求处理模型，在前端有 redux，发起请求只需要 dispatch(action)。在后端有 express，使用 app.use(handler)即可处理请求，组织响应。

express 中间件的结构：
function (req, res, next) {
…
next();
…
}

redux 中间件的结构:
store => next => action => {
…
next();
…
}

二者的差别在于，中间件之间的调用关系不同，因此实现也有差异。

express 则是构造了一个存放中间件的数组，并使用了 next()来迭代这个数组。
app = express() 初始化了一个可以保存中间件的数组，并定义了 next 函数。
app.use(middleware) 向这个数组中添加中间件。
中间件通过调用 next 来启动后续中间件的执行。

redux 中使用了 funcs.reduce((a, b) => (…args) => a(b(…args)));
在理解了 Array#reduce 和 扩展运算符(…)之后，这段代码的效果就显而易见。
即把 (f1(x), f2(x), f3(x), f4(x)) 变成了 x => f1(f2(f3(f4(x))))，概括来说，就是从右往左执行，先执行的函数的输出是后执行函数的输入。

redux 首先为每个 middleware 注入 store——仅包含{getState, dispatch}两个函数的对象，此时的 dispatch 仅仅是一个占位符，这样 middle 执行了第一次。然后调用 compose，对结果传入 store.dispatch，此时外层的中间件 f1, 其结构已经是

```javascript
action => {
  //…
  next();
  //…
}
```

这是一个标准的 redux dispatcher，接受一个 action，然后执行 reducer。redux 的这种设计，使用闭包记住了依次传入的参数 store.getState、store.dispatch，以及后续的中间件的引用——next。因此，在中间件中必须要调用 next(action)，让后续的中间件乃至 action 能够被 store.dispatch 消费掉，进而被 reducer 处理。
