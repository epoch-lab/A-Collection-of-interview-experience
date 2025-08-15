
手写并发控制池

手写深拷贝（带Date版本）

数组去重（不用set和排序如何实现）

防抖、节流

```js
const func = (fn, delay=300) => {
    let timer = null;
    return function(...args){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },delay)
    }
}

const func = (fn, delay=300) => {
    let isTh = false;

    return function(...args){
            if(isTh) return;

        fn.apply(this, args);

        isTh = true;
        setTimeout(()=>{
            isTh = false;
        },delay)
    }
}
```


js对象比较判等

下划线转小驼峰

