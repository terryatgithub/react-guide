# React项目实战2

## 掌握数据流方案 dva 
源码已经很久没人维护了。重点学习思想，用到项目中。

dva 其实是在成熟框架库的基础上，做了一层封装

封装了以下库等：
redux
react-redux
react-router-dom
redux-saga
history


why dva? & 解决了哪些问题? 
### todo 1. 看官网why dva 链接
原本reducer saga action 都是分离的
继承reducer effect 到一个model里，涉及到数据层的交互会简单些。

### dva跟vuex mobx都很像，思想类似。

            state               
        /
    connect
    /
route
component - diaptch -  action - Model
                                reducer
                                Effect   <-->    server
                                Subscription


#### 实现 dva 动态注册 
models里的state：
用dva/dynamic例的dynamic方法
UserPageDynamic = dynamic({
    app,
    models: ,
    component: 
})

#### dva原理 看源码
dva源码相对简短 容易看，可以快速看下，理解和学习思路。
const app = dva({})
app.model() //执行subscription收集所有订阅，
app.router()
app.start()
dynamic.js源码(高阶组件，注册model，渲染组件)


#### Q：有了hook可以取代redux吗？                                
redux用于管理和共享store.state；
用了hook后有了useReducer()，可以把redux的概念拿过来用；
高老师：用redux可以实现数据和逻辑层分离，用hooks无法做到分离。



dva偏向数据流
umi以路由为基础

## 掌握企业级应用框架 umi
umi2 和umi3差别很大，记得区分版本号和文档

#### 对比cra/next.js umi比较傻瓜式，集成了很多功能



## 推荐的React项目： Antd Pro