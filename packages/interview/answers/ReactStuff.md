### React 全家桶

#### react 生命周期函数

1. mount
   1. `constructor(props)`
      1. 初始化`this.state`和`function.bind(this)`
      2. 为什么必须首先调用`super(props)`?
         实例化`this.props`
   2. `static getDrivedStateFromProps(props, state): Object | null`
      1. 这个生命周期的作用是使用变化的 props 去更新 state，减少一次 render
      2. render 之前调用
      3. 返回值会合并到 state 中
   3. `render(): ReactNode`
      1. `ReactComponent`、`ReactElement`和`ReactNode`有什么区别？
         1. `ReactComponent`是 UI 及其行为的抽象，包括`class component`和`function component`
         2. `ReactElement`特指`React.createElement(type, props, ...children)` 的返回结果，是一个纯 JS 对象，有`$$typeof: ReactElement`属性
         3. `ReactNode` 包括`ReactElement`以及`ReactFragment`/`ReactPortal`/`number`/`string`/`boolean`和以上这几种类型的数组
   4. `componentDidMount()`
      1. DOM 节点已经可用还是已经显示在页面上？（DOMContentLoaded 还是 onload）
         didMount => DOMContentLoaded => onload
2. update
   1. `static getDrivedStateFromProps(props, state): Object | null`
   2. `shouldComponentUpdate(nextProps, nextState): boolean`
      1. 预先查看下一次渲染使用的 props 和 state，决定是否需要渲染
      2. 最好使用`PureComponent`, 这个函数会自动对所有 props 和 state 作浅比较
   3. `render(): ReactNode`
   4. `getSnapshotBeforeUpdate(prevProps, prevState): any`
      1. 返回值将会作为 componentDidUpdate 的第三个参数
   5. `componentDidUpdate(prevProps, prevState, snapshot)`
3. unmount
   1. `componentWillUnmount()`
4. error

   1. `static getDerivedStateFromError(error)`

      1. 目的在于从异常中恢复 UI
      2. 仅捕捉各生命周期函数内异常
      3. 不能捕捉以下异常
         1. 事件监听器？
            不影响 UI 渲染，不需要捕获。**如果需要捕获呢?**
         2. 异步代码，setTimeout raf
         3. **ssr，为什么？**
         4. Error Boundary 自身异常

   2. `componentDidCatch(error, info: {componentStack})`
      1. 生产环境 error 不会冒泡，开发环境会

#### context

react 的自上而下数据流只能通过 props 一层一层传递数据，而 context 提供了一个跨组件层级通信的一种方式。因此，context 就像是一个公共数据源，需要其中数据的组件都可以通过特定的 API 获取其中的数据。

context 的 API 包括创建和使用。
`React.createContext(defaultValue:any)`创建一个 Context 对象，而后使用
`<Ctx.Provider value={customValue}></Ctx.Provider>`包裹需要使用 context 里的数据的组件。

使用 context 的值有三种方式：

1. 后代组件可以使用`<Ctx.Consumer>{value => Component}</Ctx.consumer>` 的形式使用 Context 的值
2. 使用 Hook useContext: `const value = useContext(Ctx)`
3. `static contentType = Ctx`来绑定一个 Context, 然后可以通过实例属性`this.context`来获取 Ctx 的 value（Why & How）。这种方式有个明显的弊端，即只能从一个 Context 中读取数据

#### ref

ref 提供了一种父组件控制子组件行为的方式，这在某些特定场景下会十分有用。如让子组件 focus。

创建 ref 变量有三种方式：

1. `React.createRef()`
2. `callback pattern ref`
3. `useRef()`

其中`useRef()` 和 `React.createRef()`类似，将 API 的返回值作为传递给子组件的`ref`prop 即可。

而`callback pattern ref` 则不一样，这种方式是传递一个接收`domNode`或者`ClassComponent instance`的函数，至于如何使用这个参数完全是自由的。

此外，由于`FunctionalComponent`是不会实例化的，因此不可以将 ref 传递给`FunctionalComponent`，但是父组件可以通过`React.forwardRef()`让函数式组件获取到 ref，从而 attach 到具体组件上

1. `React.createRef()` 和 `callback pattern ref`
2. `React.forwardRef(Component: (props, ref) => ReactNode)`
3. 如果给函数式组件传递了 ref 会怎么样？
   react 会给出警告，但是 UI 会正常渲染，此时 ref.current 会是`undefined`

#### react Hooks

```javascript
// Hook 的底层数据结构
{
  memoizedState: any;
  baseState: any;
  queue: any;
  baseUpdate: any;
  next: any;
}
```

1. 为什么不能使用 Hook 捕捉异常

#### 事件合成

1. react 实现了一套跨浏览器的事件系统
2. react 利用了事件委托，将所有事件绑定到 document 元素上，从而大大降低了监听器的数量，优化了内存使用
3. 当 dom 原生事件触发时，进入合成事件层，最后才会调用监听器
