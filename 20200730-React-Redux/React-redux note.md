# React03 Hook和React-redux使用及源码 (7.30)

bindActionCreators()

## React redux hook

useSelector()
useDispatch()

useCallback()

## 1. 掌握所有Hooks组件
### Hooks API 
    什么是Hooks    

        基础Hook
            useState 
            useEffect
            useContext 函数组件快速context

         额外的Hook
            useReducer
            useCallback 缓存函数
            useMemo  缓存参数
            useRef
            useImperativeHandle
            useLayoutEffect
            useDebugValue

        自定义Hook

#### useReducer
    useState的替代方案
    const [state, dispatch] = useReducer(reducer, initialArg, init)
    //返回的是数组，why？ 数组解构只跟顺序有关，如果是对象，要知道具体的key值

#### useEffect useLayoutEffect
    同步更新用useLaytouEffect



### 什么时候用类组件、函数组件？
1. 有了Hook，函数组件可以完全替代类组件
2. 函数组件颗粒度更小
3. 自定义Hook可以逻辑复用
4. 函数组件是目前的趋势
        
## 2. 掌握高阶组件



## 3. 掌握react-redux使用和原理
### 框架React-Redux
Provider
connect

```javascript
实现bndActionCreators(creators, dispatch) {
    
}


connect(mapStateToProps: ({count}) => ({count}), 
        mapDispatchToProps: {add: () => ({type: 'ADD'})})(Cmp)
export const connect = (
    mapStateToProps = state => state,
    mapDispatchToProps,
) => wrappedComponent => props => {
    {dispatch}

}

类组件有forceUpdate()，但函数组件并没有这个api，（可以在官网搜索forceUpdate 查看）

```

### React-redux hook
    useSelector 获取store.state
    useDispatch 获取dispatch方法
    函数一般可以做个缓存，useCallback()





### 分清各个框架的Hook



### todo
1. @important 每节课都要画出脑图，辅助记忆，方便复习
2. @important 要动手做个项目，否则知识点串不起来

## 作业 
    画redux数据流向图
@暗号 马里


