# React 原理解析03

MUST DO:
## ! 这节课之前所有预习视频必须全看完，否则作业可能不会做。

# 课堂目标
    1. 掌握fiber
    2. 掌握hook原理
        自定义Hook一定要会

## Hook
    Q 什么是hook (16.8后可用)
    A 
    1. 可以让你在不编写class的情况下，在函数组件中使用state及其它react特性
    2. 在组件间复用状态逻辑
    3. 函数组件颗粒性更小，方便维护，复用性更高。
    hook里的函数都是use开头
    useState 
    useReducer

    其它React特性，比如：
        useContext
        useEffect
        useLayoutEffect
        useCallback 缓存函数
        useMemo 缓存参数

    Q Hook解决了什么问题
    A 1. 在组件之间复用状态逻辑很难 
         自定义hook
      2. 复杂组件变得难以理解
         useEffect做拆分
      3. 难以理解的class

    Q Hook有哪些api
        useState
        useEffect 异步
        useContext

        useReducer
        useCallback
        useMemo
        useRef
        useImperativeHandle
        useLayoutEffect 同步


    Q 什么时候用函数组件，不用类组件？
        函数组件：

    ### Hooks原理   
        ！Hook只能在最外层使用

    react合成事件


## React中的数据结构
    Fiber
    SideEffectTag
    ReactWorkTag
    Update & UPdateQueue



## 创建更新
    ReactDOM.render
    setState与forceUpdate
    协调












