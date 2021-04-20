### React全家桶
#### react生命周期函数
1. mount
    1. `constructor(props)`
        1. 初始化`this.state`和`function.bind(this)`
        2. 为什么必须首先调用`super(props)`?
            实例化`this.props`
        
    2. `static getDrivedStateFromProps(props, state): Object | null`
        1. 这个生命周期的作用是使用变化的props去更新state，减少一次render
        2. render之前调用
        3. 返回值会合并到state中
        
    3. `render(): ReactNode`
        1. `ReactComponent`、`ReactElement`和`ReactNode`有什么区别？
            1. `ReactComponent`是UI及其行为的抽象，包括`class component`和`function component`
            2. `ReactElement`特指`React.createElement(type, props, ...children)` 的返回结果，是一个纯JS对象，有`$$typeof: ReactElement`属性
            3. `ReactNode` 包括`ReactElement`以及`ReactFragment`/`ReactPortal`/`number`/`string`/`boolean`和以上这几种类型的数组
            
    4. `componentDidMount()`
        1. DOM节点已经可用还是已经显示在页面上？（DOMContentLoaded还是onload）
            didMount => DOMContentLoaded => onload
2. update
    1. `static getDrivedStateFromProps(props, state): Object | null`
    2. `shouldComponentUpdate(nextProps, nextState): boolean`
        1. 预先查看下一次渲染使用的props和state，决定是否需要渲染
        2. 最好使用`PureComponent`, 这个函数会自动对所有props和state作浅比较
        
    3. `render(): ReactNode`
    4. `getSnapshotBeforeUpdate(prevProps, prevState): any`
        1. 返回值将会作为componentDidUpdate的第三个参数
    5. `componentDidUpdate(prevProps, prevState, snapshot)`
    
3. unmount
    1. `componentWillUnmount()`
    
4. error
    1. `static getDerivedStateFromError(error)`
        1. 目的在于从异常中恢复UI
        2. 仅捕捉各生命周期函数内异常
        3. 不能捕捉以下异常
            1. 事件监听器？
                不影响UI渲染，不需要捕获。**如果需要捕获呢?**
            2. 异步代码，setTimeout raf
            3. **ssr，为什么？**
            4. Error Boundary 自身异常

    2. `componentDidCatch(error, info: {componentStack})`
        1. 生产环境error不会冒泡，开发环境会

#### context
react的自上而下数据流只能通过props一层一层传递数据，而context提供了一个跨组件层级通信的一种方式。因此，context就像是一个公共数据源，需要其中数据的组件都可以通过特定的API获取其中的数据。

context的API包括创建和使用。
`React.createContext(defaultValue:any)`创建一个Context对象，而后使用
`<Ctx.Provider value={customValue}></Ctx.Provider>`包裹需要使用context里的数据的组件。

使用context的值有三种方式：
1. 后代组件可以使用`<Ctx.Consumer>{value => Component}</Ctx.consumer>` 的形式使用Context的值
2. 使用Hook useContext: `const value = useContext(Ctx)`
3. `static contentType = Ctx`来绑定一个Context, 然后可以通过实例属性`this.context`来获取Ctx的value（Why & How）。这种方式有个明显的弊端，即只能从一个Context中读取数据

#### ref
ref提供了一种父组件控制子组件行为的方式，这在某些特定场景下会十分有用。如让子组件focus。

创建ref变量有三种方式：
1. `React.createRef()`
2. `callback pattern ref`
3. `useRef()`

其中`useRef()` 和 `React.createRef()`类似，将API的返回值作为传递给子组件的`ref`prop即可。

而`callback pattern ref` 则不一样，这种方式是传递一个接收`domNode`或者`ClassComponent instance`的函数，至于如何使用这个参数完全是自由的。

此外，由于`FunctionalComponent`是不会实例化的，因此不可以将ref传递给`FunctionalComponent`，但是父组件可以通过`React.forwardRef()`让函数式组件获取到ref，从而attach到具体组件上

1. `React.createRef()` 和 `callback pattern ref`
2. `React.forwardRef(Component: (props, ref) => ReactNode)`
3. 如果给函数式组件传递了ref会怎么样？
    react会给出警告，但是UI会正常渲染，此时ref.current会是`undefined`

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
1. 为什么不能使用Hook捕捉异常