//数组的map/reduce (映射归并，函数式编程里大量用到的高阶技巧）
//尤其是归并方法，要刻意训练、熟练理解和使用

//case 1: 简单数组归并
let a = [1,2,3,4]
a.reduce((accumulator, currentValue) => {
    console.log(`accumulator: ${accumulator}, currentValue: ${currentValue}`);
    return accumulator = accumulator + currentValue
})


//case 2: 函数式编程
function f1(args) {
    return 'f1 + ' + args
}
function f2(args) {
    return 'f2 + ' + args
}
function f3(args) {
    return 'f3 + ' + args
}
function f4(args) {
    return 'f4 + ' + args
}
f1(f2(f3(f4('init value'))))
//@important：这种方式如何用数组归并方法处理？？
//1. 使用方式应该是
compose(f1,f2,f3,f4)('init value')
//2. 从1反推，compose()应该返回一个最终的聚合函数，
//   然后传入参数'init value'
function compose(...fns) {
    //compose函数返回值应该是一个函数
    return fns.reduce((accumulator, currentFn) => {
        //@important 每次归并后，返回的还是函数：
        //比如第一次循环进来返回 (...args) => f1(f2(...args))
        //第二次循环进来返回 (...args) => f1(f2(f3(...args)))
        //第三次循环进来返回 (...args) => f1(f2(f3(f4(...args))))
        console.log(`accumulator: ${accumulator}, currentFn: ${currentFn}`);
        return (...args) //返回的是函数，这是这个函数将来接收的参数值 
            => accumulator(currentFn(...args)) //把参数值给当前函数，优先执行
    })
}
//简写为以下：
function compose(...fns) {
    return fns.reduce((a, b) => (...args) => a(b(...args)))
}

// ...args的语法看下
function add(...rest) {
    return rest.reduce((a,b) => a + b)
}
function foo(...args) {
    console.log(args); //args是数组 
    console.log(...args); //解构成1,2,3,4,5; 所以上面compose函数要写成(...args) => a(b(...args))
    return add(...args)
}
foo(1,2,3,4,5)