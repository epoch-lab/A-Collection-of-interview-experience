

#### Promise.prototype.finally实现

```js
Promise.prototype.finally = function(callback){
    const P = this.constructor || Promise;
    return this.then( // 调用 使用finally的Promise的then方法
        value => P.reslove(callback()).then(()=>value) // 用resolve包裹，解决返回promise的情况
        reason => P.reslove(callback()).then(()=>{throw reason})
    )
}
```

