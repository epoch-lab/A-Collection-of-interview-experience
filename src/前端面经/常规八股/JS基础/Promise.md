
##### 并发请求
<https://juejin.cn/post/7163522138698153997>

```md
实现一个并发请求函数concurrencyRequest(urls, maxNum)，要求如下：
• 要求最大并发数 maxNum
• 每当有一个请求返回，就留下一个空位，可以增加新的请求
• 所有请求完成后，结果按照 urls 里面的顺序依次打出（发送请求的函数可以直接使用fetch即可）
```

##### HardMan