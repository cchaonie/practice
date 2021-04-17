## 理解Redux

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

### 为什么要Redux

要回答这个问题，我们需要先知道Redux是什么。

#### Redux是什么

本文开头就引用了官方文档中对Redux的概括——一个 `JavaScript` 应用的可预测的状态管理器。在理解了状态之后，我们大概猜测到，Redux就是管理 `JavaScript` 应用的状态的工具，当与用户进行交互的时候，可以对状态进行修改。

同样，对照到台灯与开关这个系统，Redux是这样的：

- 打开开关，Redux把台灯的状态变成亮
- 关闭开关，Redux把台灯的状态变成灭

也就是说，`JavaScript` 应用在完成后有一个初始状态，这时候没有跟用户交互——生下来就是这副模样，接下来的生命周期里，状态变化都由Redux来管理。

#### Redux的优点是什么

为什么要用Redux，就是要说明Redux解决的问题是什么。
还是台灯。
只有一个开关，一个台灯，这是一个很简单的系统，完全不需要用到Redux也没有问题。
但是如果有十个开关，一个台灯。有一种开关是按一下开，再按一下就关，再按一下又开......按着按着，我们就不能清楚地知道接下来按下一个开关，是不是能关闭台灯了。
在 `JavaScript` 应用中，如果又多个页面与同一个状态相关，而且这些页面又可以独立变化，那么就很难跟踪这个状态。Redux就是为了解决这个问题。

Redux是通过坚持以下三个原则来实现这一点的：

- 全局只有一个状态中心
  只有一个状态中心意味着所有需要用到这个状态的地方，都直接从这里获取状态，不需要自己再保存一个状态，省去了同步状态的过程。
- 状态是只读的
  只读意味着拿到什么就去渲染什么，这就避免了无意中修改状态导致的问题。想要修改状态，只能使用状态中心提供的方法。
- 只能通过纯函数来修改状态
  修改状态的方法由状态中心提供的纯函数——纯函数可以重复执行，同样的参数就会返回同样的结果。这就保证了对状态的修改是可跟踪的，这也是为什么Redux是可预测的。只能通过指定的方法修改状态，状态的变化只跟输入相关。因此，一旦确定了输入和修改方法，那么状态的结果就是可预测的了。
  
## Redux的使用

根据Redux的三大原则——全局唯一性、只读性、纯函数(修改)性，我们首先来看看Redux的组成

### Redux的组成

- Store
既然是管理状态的工具，那么必须要有一个存储状态的地方，这个称为**Store**
- Reducer
既然状态是只读的，必须要提供更新的接口，这个称为**Reducer**
- Action
Reducer只是提供了怎么去更新状态的接口，那什么时候调用Reducer呢——向Store发一个**Action**。Action中指定了要调用的Reducer以及需要用来更新状态的数据

除了作为一个状态管理中心所必备的功能之外，Redux还有以下特征：
- 作为一个观察者模式中的被观察对象
实际上，观察者模式在这里被称为**发布——订阅模式**，即对状态感兴趣的页面，主动发出订阅请求，成为一个监听器。当状态中心里状态发生变化的时候，就会通知订阅者，执行监听器，相关的页面就会响应状态的变化。因此，Redux提供了一个订阅方法，并且维护了一个监听器列表。

### 如何集成Redux

Redux本身是作为一个状态管理工具，并不是和React绑定的。而React-Redux就是一个把React和Redux绑定的工具。使用React-Redux只是因为它可以帮助我们更好地在React中使用Redux，所以这里我们先考虑不使用中间件React-Redux的情况下，如何在React应用中使用Redux。

通过对Redux的剖析，我们大致也能归纳出使用Redux的步骤：
- 分析应用中的状态是什么，即确定Store中的数据
- 状态有哪些变化，以及如何变，即确定Reducer和Action
- 创建一个状态中心，即Store
- 在页面上订阅Store，即注册监听器
- 获取Store中的数据，并渲染UI

### 使用

```javascript
 // store.js 这里为了方便，将整个Store及reducer、action都放在了一个文件
import { createStore } from 'redux'
const initialState = {
  index: 0,
  todoList: [],
}
export default createStore((state = initialState, { type, payload = {} }) => {
  const { index, status } = payload
  switch (type) {
    case 'NEW':
      {
        payload.key = state.index
        payload.status = 'UNDONE'
        return {
          todoList: [
            ...state.todoList,
            payload
          ],
          index: state.index + 1
        }
      }
    case 'DONE':
      return {
        todoList: state.todoList.map((todo, i) => {
          i === index ? todo.status = 'DONE' : todo
          return todo
        }),
        index: state.index
      }
    case 'UNDONE':
      return {
        todoList: state.todoList.map((todo, i) => {
          i === index ? todo.status = 'UNDONE' : todo
          return todo
        }),
        index: state.index
      }
    case 'TRASH':
      return {
        todoList: state.todoList.map((todo, i) => {
          i === index ? todo.status = 'TRASH' : todo
          return todo
        }),
        index: state.index
      }
    case 'RETRIVE':
      return {
        todoList: state.todoList.map((todo, i) => {
          i === index ? todo.status = 'UNDONE' : todo
          return todo
        }),
        index: state.index
      }
    default:
      return state
  }
})

// app.js
import store from './store'

function listener(){
    console.log(store.getState());
}

store.subscribe(listener);
store.dispatch({
    type: 'NEW',
    payload: {
        key: 0
    }
});
```

### 原理
#### enchaner
    1. applyMiddleware函数返回enhaner
    2. enhaner的关键在于增强了store的dispatch方法
    3. middleware的调用过程决定其结构
    
```js
function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    const middlewareAPI = {
      getState,
      dispatch
    }
    // 第一次：用 middlewareAPI 依次调用middleware，返回接受dispatch函数的函数
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 第二次：用compose构造middleware调用链，用store.dispatch调用middleware调用链，返回
    const dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

function compose(...fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}

function middleware({getState, dispatch}) {
  return next => action => {
    // 实际处理逻辑，调用next(action)让下一个 middleware 处理
    next(action)
  }
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

## store的api有哪些？分别有何作用？
store.getState()
store.dispatch(action)
store.replaceReducer(newReducer)
store.subscribe(listener)
store是redux暴露出来的一个对象，可以获取当前状态，可以发出改变状态的指令。那么reducer又在哪里呢，如何发生作用的呢？
reducer是通过闭包dispatch函数的闭包存在的。当store.dispatch发出一个新的变更指令后，首先会使用闭包中的reducer去计算新的状态，然后用新的状态去调用监听器，达到通知更新的目的。
在运行时，通过store.replaceReducer()可以动态地调整reducer，基于这个特性，可以实现reducer的动态注入。

## applyMiddleware函数的作用
applyMiddleware是注入中间件到redux的接口，实际上是修改了原生的store.dispatch函数。在应用中，我们使用的dispatch函数其实是包装了中间件之后的版本，并非redux原生的dispatch。

## 为什么middleware的签名是 store => next => action
applyMiddleware处理中间件时，首先会传入store，这样中间件就能够获取当前状态了。之后，applyMiddleware会使用compose把next => action组合起来，通过Array#reducer函数组合起来，这样从左到右传入的middleware会从右到左嵌套调用，next在运行时就是上一个中间件，而最后一个中间件接收的next才是真正的redux原生的dispatch函数。因此，在middleware中调用next(action)，其实就是在让后续的middleware有机会处理action。

## 中间件
中间件存在的价值在于解耦。当client向server发起请求之后，并不关注实际的请求是如何被处理、被谁处理，client关注的是结果。

这种请求处理模型，在前端有redux，发起请求只需要dispatch(action)。在后端有express，使用app.use(handler)即可处理请求，组织响应。

express中间件的结构：
function (req, res, next) {
	…
	next();
	…
}

redux中间件的结构:
store => next => action => {
	…
	next();
	…
}


二者的差别在于，中间件之间的调用关系不同，因此实现也有差异。

express则是构造了一个存放中间件的数组，并使用了next()来迭代这个数组。
app = express() 初始化了一个可以保存中间件的数组，并定义了next函数。
app.use(middleware) 向这个数组中添加中间件。
中间件通过调用next来启动后续中间件的执行。

redux中使用了 funcs.reduce((a, b) => (…args) => a(b(…args)));
在理解了Array#reduce 和 扩展运算符(…)之后，这段代码的效果就显而易见。
即把 (f1(x), f2(x), f3(x), f4(x)) 变成了 x => f1(f2(f3(f4(x))))，概括来说，就是从右往左执行，先执行的函数的输出是后执行函数的输入。

redux首先为每个middleware注入store——仅包含{getState, dispatch}两个函数的对象，此时的dispatch仅仅是一个占位符，这样middle执行了第一次。然后调用compose，对结果传入store.dispatch，此时外层的中间件f1, 其结构已经是

action => {
	…
	next();
	…
}

这是一个标准的redux dispatcher，接受一个action，然后执行reducer。redux的这种设计，使用闭包记住了依次传入的参数store.getState、store.dispatch，以及后续的中间件的引用——next。因此，在中间件中必须要调用next(action)，让后续的中间件乃至action能够被store.dispatch消费掉，进而被reducer处理。

