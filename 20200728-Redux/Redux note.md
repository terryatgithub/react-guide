# 上节课回顾
Form.useForm()是自定义Hook
//@todo important 组件化表单待掌握

函数组件
<From form={form}>

类组件 没有form参数，
<Form ref={this.formRef}>
ref不是props，（key和ref不是props，不能通过props传递，源码底层会处理掉）
const Form = React.forwardRef(_Form) //todo 了解 官网refs文档
useImperativeHandle(ref, createHandle)
<!-- React.createRef() -->

## 弹窗类组件
使用 Portal 传送门
createPortal react-dom


## 函数式编程
f1(f2(f3('omg')))
洋葱模型
let res = compose(f1,f2,f3)('omg')
function compose(...funcs) {
    if(funcs.length === 0) { //没有函数时返回原本的args
        return args => args //刚开始一脸懵逼，还是理解有问题，其实这里返回的是个函数，args => args 是函数的箭头函数简写，不就相当于 return function(args) {return args} 吗 ???!!! 
    }
    if(funcs.length === 1) { //只有一个函数时，不需要执行归并处理
        return funcs[0]
    }
    //@todo 这里的reduce研究下，彻底弄明白
    //reduce 归并
    //a是每一步归并的结果，b是数组里下一项
    //args也要往下传
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
compose(f1, f2, f3, f4)('haha')
function compose(...fns){
   return fns.reduce((a, b) => (...args) => a(b(...args)))
}

# Redux
    dispatch(action)          previousState,action
Action Creators  ====> Store  ======> Reducers (定义规则)
                        ||      newState
                  state ||
                        \/
                      React 
                    Components

## 手写redux

```javascript
export default function createStore(reducer, enhancer) {
    //如果有中间件
    if(enhancer){
        // @todo 
        //原版dispatch只能接受普通对象，用中间件加强之后变强大，可以处理多种形式，如callback
        // promise; 
        // 加强的是dispatch，需要先获取原先的dispatch；dispatch来自createStore，
        //理解：
        //enhancer是applyMiddleware(...middlewares)后的聚合函数
        //enhancer接受createStore，加强其中的dispatch方法后，返回一个新的createStore函数,这个createStore函数也接受reducer参数
        //所以 enhancer == applyMiddleware(...middlewares)
        //     enhancer(createStore) === applyMiddleware(...middlewares)(createStore) === 一个增强了dispatch方法后的 createStore函数
        //     enhancer(createStore)(reducer) === applyMiddleware(...middlewares)(createStore)(reducer) === 相当于调用增强了dispatch方法后的 createStore(reducer) 
        //【本质上跟刚开始调用 createStore(reducer) 返回一个store对象一模一样，只是其中dispatch方法增强了。 
        return enhancer(createStore)(reducer)
    }

    let currentState
    let currentListeners = []
    function getState(){
        return currentState
    }
    function dispatch(action){
        currentState = reducer(currentState, action)
        //@note 派发action时执行回调
        currentListeners.forEach(listener => listener())
    }
    function subscribe(listener){
        //注册回调
        currentListeners.push(listener)
        //@note 需要返回一个函数，注销事件监听的订阅函数
        return () => {
            //过滤掉设置的listener
            currentListeners = currentListeners.fileter(
                cb => cb !== listener
            )
        }
    }

    //@important 初始化时执行一次派发事件
    dispatch({type: 'REDUX/KKKB'})

    //createStore就是返回包含下面3个方法的对象
    return {
        getState,//获取状态
        dispatch,//触发改变state
        subscribe //订阅
    }
}
```

## reducer/reduce @important
什么是reducer 处理state和action的规则函数
什么是reduce： reduce就是聚合函数

## 异步
异步需要中间件
redux-thunk 
redux-logger
redux-promise

### 使用中间件
const store = createStore(countReducer, applyMiddleware(thunk, logger))

//可以接收多个中间件参数
function applyMiddleware(...middlewares) {
    //这个函数需要返回
    return createStore => reducer => {
        const store = createStore(reducer)
        let dispatch = store.dispatch
        //@todo 加强dispatch 执行dispatch前先执行中间件，why？
        //@todo midApi
        //@todo compose()

        return {
            ...store,
            //返回加强之后的dispatch
            dispatch
        }
    }
}

```javascript
export default function applyMiddleware(...middlewares) {
    //返回的是一个二阶函数，
    // 1. 接受旧的createStore方法
    // 2. 获取其中dispatch方法
    // 3. 增强之
    // 4. 返回新的增强后的createStore方法
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const middlewareChain = middlewares.map(middleware => middleware(midApi));

    // dispatch被加强了
    dispatch = compose(...middlewareChain)(store.dispatch);

    return {
      ...store,
      //  返回加强之后的dispatch
      dispatch
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return args => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  //reduce里返回的还是函数，返回的是聚合后的函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

saga

## 手写中间件
@todo 这里要重点理解
next()相当于每次compose每次集合返回的函数
@important !讲师：next就是聚合函数,这句还要理解

@important 要搞清使用及原理
中间件的设计思路 和 
compose()聚合函数的设计思路 
applyMiddleware()的设计思路
1. 中间件设计思路
都是返回二阶函数，接收参数为对象midApi: {getState, dispatch}
其中第一阶的参数为next聚合函数，第二阶参数为action, 第二阶函数就是增强后的dispatch函数
比如

```javascript
function logger({getState}) {
    return next => //next是之前所有中间件聚合后生成的函数
        action => { //返回的本质还是一个dispatch-like函数，接收action参数
            let prev = getState()
            //执行聚合函数
            let res = next(action)
            let after = getState()
            return res
        }
}
```

2. compose()设计思路：


3. applyMiddleware设计思路
```javascript
applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer);
        // 获取到原来的dispatch
        let dispatch = store.dispatch;
    
        //先执行一遍所有middleware，why？？
        //midApi是传给所有中间件的参数
        const midApi = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        };
        //获取到中间件的链
        //所有中间键先执行一遍，返回值是对应的二阶函数
        //中间件执行后的返回值都是： next => action => {} 这样的
        const middlewareChain = middlewares.map(middleware => middleware(midApi));
        }
        // dispatch被加强了，
        // compose()是这样的: funcs.reduce((a, b) => (...args) => a(b(...args)))
        // 承上备注，a(b(...args)) 其中 b(...args)就是传给a函数的next参数，a(b(...args))执行后返回的是个dispatch-like函数，形如： action => {} 
        applyMiddleware(thunk, logger, promise)来说，

        //compose返回的是形如这样的函数：
        //(...args) => a(b(...args))
        //然后如下调用，传入参数 store.dispatch
        //就变成(store.dispatch) => a(b(store.dispatch))
        // 对b(store.dispatch)这个调用，store.dispatch就是next参数，最终返回的是 action => {next(action)} 这样的dispatch-like函数
        //最终compose(...middlewareChain)返回的是
        // (...args) => a(b(...args))这样的函数,其中(...args)参数是 next聚合函数
        //对下面这句调用，store.dispatch是传入的初始next聚合函数
        //后续的next函数都是结合了中间件功能的增强后的dispatch版本
        dispatch = compose(...middlewareChain)(store.dispatch);
        //在compose里逐层封装next(最初是store.dispatch)的顺序是从后往前的，
        //最后执行时的调用顺序是按传入参数的先后顺序调用的
        //这应该是这里所说的洋葱模型
        //compose聚合时是逆序的，从后往前加强dispatch
        //真正执行时是顺序的，从前往后逐层调用的（逐个调用的）
        //这里的设计模式真精辟！！真牛逼！！

        return {
        ...store,
        //  返回加强之后的dispatch
        dispatch
        };

}

```

# 作业
实现 combineReducers，阅读源码，[https://www.baidu.com/s?ie=UTF-8&wd=combineReducers]
暗号： 毛里塔尼亚