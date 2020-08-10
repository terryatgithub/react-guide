# React 项目实战

saga 文档[https://redux-saga-in-chinese.js.org/]

## 掌握生成器函数 generator

generator 函数可以处理更复杂的情况
async/await 是 genenrator 的语法糖

```javascript
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}
var hw = helloWorldGenerator();
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

var a = 0;
function* fun() {
  let aa = yield (a = 1 + 1); //惰性求值
  return aa;
}
console.log("fun0", a);
//generator函数返回的是遍历器对象
let b = fun();
//惰性求值，必须调用next()才会执行
console.log("fun", b.next());
console.log("fun1", a);
```

## 掌握路由守卫

1. PrivateRoute

```javascript
```

## 掌握 redux 异步方案： redux-saga

### thunk vs. saga

两者都是解决异步的
thunk 适合简单逻辑，thunk 会有回调嵌套地狱的情况 promise 的回调
saga 用的全是 generator 函数
Saga 中用到的 api：

1. 调用异步操作 call
2. 状态更新 put (相当于 dispatch)
3. 做监听 take | takeEvery

```javascript
import { call, put, takeEvery, take, fork, all } from "react-saga/effects";
//watcher saga
function* loginHandle(action) {
  try {
    //第一个异步请求
    const res1 = yield call(loginService.login, action.payload);
    //同步的方式调用第二个请求，这个请求依赖于第一个请求返回值
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    //同步的方式 触发状态更新
    yield put({
      type: "LOGIN_SUCCESS",
      payload: { ...res2 },
    });
  }
}
//worker saga
function* loginSaga() {
  //1. 用takeEvery
  // yield takeEvery('LOGIN_SAGA', loginHandle)

  //2. 用take只能实现一次监听，多次要用while(true)
  while (true) {
    const action = yield take("LOGIN_SAGA");
    //call是阻塞型调用，generator在调用结束之前不执行其他事情
    // yield call(loginHandle, action);
    //fork是非阻塞型调用，任务在后台启动，调用者可以继承自己的流程，不用等待fork任务结束
    yield fork(loginHandle, action);
  }
}

//自己实现takeEvery
const takeEvery = (pattern, saga, ...args) => fork(function*(){
    while(true) {
        const action = yield take(pattern)
        yield fork(saga, ...args.concat(action))
    }
})


export default loginSaga;
```

saga源码
src/internal/middleware.js

# 作业
预习 umi dva, 去dva官网找出来dva数据流向图，自己画一遍。
@暗号 乍得