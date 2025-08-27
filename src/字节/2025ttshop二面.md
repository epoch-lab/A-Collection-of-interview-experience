

lint-stage配置的增量更新是怎么实现的？

```js
const flatData = [{
 key: 1,
 parent: null,
 name: '第一层',
}, {
 key: 2,
 parent: null,
 name: '第一层',
}, {
 key: 3,
 parent: 1,
 name: '第二层',
}, {
 key: 4,
 parent: 3,
 name: '第三层',
}];


// [{
//     key:1
//     children:[
//         {
//             key:3
//         }
//     ]
// },{
//     key:1,
//     children:[

//     ]
// }
// ]



const arrayToTree = (array) =>{
    const myMap = new Map();

    array.map(item=> { 
        myMap.set( item.key, { ...item, children:[] } )
        })

    let res = [];

    // 循环
    for(let item of array){
        const parent = myMap.get(item.parent);
        
        if(parent !== null){
            if(parent.children !== null){
                parent.children.push({
                    ...item
                })
            }else{
                parent.children = [{
                    ...item
                }]
            }
        }else{
        }
    }

    return res;
}


console.log(arrayToTree(flatData));
```