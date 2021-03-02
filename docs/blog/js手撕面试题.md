---  
title: JS手撕面试题  
date: 2020-12-08  
categories:  
 - 面试  
tags:  
 - js  
 - code  
---  

## 1. 实现 new 操作符  
使用 new 操作符创建实例，进行了以下步骤：  
（1）创造一个新的对象   
（2）将该对象链接到构造函数的原型（变成原型的实例对象）    
（3）this指针指向该对象，并执行构造函数，添加属性和方法  
（4）返回该对象  
```javascript  
/**  
 * Func：构造函数  
 * args：构造函数传入的参数  
 * 注：构造函数一般无返回值，但用户可以自定义返回值覆盖对象返回方法  
 * 或者寄生构造函数，因此本实现中会判断构造函数有无返回值  
 */  
var _new = function(Func, ...args){  // 注：这里...就是将参数序列塞进一个数组args  
    // 创建一个Func的实例对象  
    const obj = {};  
    obj.__proto__ = Func.prototype;  // Func的实例对象  

    // 改变this指针，执行Func，re为函数返回值  
    let res = Func.call(obj, ...args);  // 细节，这里...就是将args展开为参数序列  
    // 这里也可以使用Func.apply(obj, args)，因为args是一个数组  

    // 若构造函数有返回值，返回的是对象或者函数，则返回res，创建成功  
    if(res != null && (typeof(res) == "object" || typeof(res) == "function")){  
        return res;  
    }  
    return obj;  // 若构造函数无返回值，则直接返回obj即可  
}  

var obj = new Func(1, 2);  
// equals to  
var obj = _new(Func, 1, 2);  
```  

## 2. 实现 instanceof 机制  
instanceof用来判断引用类型的类型，用法：`obj instanceof Object`  
使用instanceof会沿着实例对象的原型链上寻找，只要是原型链中存在该类型，则返回true，一直找到基类`Object.prototype.__proto__`  
```javascript  
/**  
* obj：待检测的数据  
* Func：给定构造函数或者类型  
*/  
function _instanceof(obj, Func){  
    // 获取 Func的原型对象  
    let Obj = Func.prototype;  
    // 获取实例对象的原型链对象  
    let proto = obj.__proto__;  

    while(true){  
        // 找到Object.prototype.__proto__还没有，返回false  
        if(proto === null)  return false;  

        // obj 的__proto__指向该原型对象  
        if(proto === Obj)  return true;  
        
        // 沿着原型链寻找  
        proto = proto.__proto__;  
    }  
}  

car instanceof Car  
// equals to  
_instanceof(car, Car);  
```  

## 3. 实现 call() 方法  
`call()`用来改变函数执行的作用域，即this指向，简单来说就是执行原函数，但是作用域改变，后面的参数逐个传入，并立即执行。  
实现：
* 给新对象内部添加一个方法属性，该函数即为原函数
* 根据传入的参数执行原函数方法，得到结果后再删除该属性，返回结果。  
```javascript  
/**  
 * context：要指向的对象
 * args：传入的参数序列，...将其转换为数组  
 */  
Function.prototype.call = function(context, ...args){  
    // context为空时作用域指向window  
    var context = context || window;  
    // 给指向的对象添加一个新属性fn，this为原函数  
    context.fn = this;  

    // 传入参数执行原函数，此时this指向context，result为在该作用域中的执行结果  
    var result = context.fn(...args);  
    delete context.fn;  // 设置完成员属性后，删除fn属性  
    return result;  // 返回执行结果  
}  
```  

## 4. 实现 apply() 方法  
实现和call()非常接近，只是传入的参数形式是数组形式，而不是逗号分隔的参数序列。  
```javascript  
Function.prototype.apply = function(context, args){  
    var context = context || window;  
    context.fn = this;  

    var result = context.fn(...args);  // 数组转化为参数序列执行  
    delete context.fn;  
    return result;  
}  
```  

## 5. 实现 bind() 方法  
bind()同样用于改变函数执行的this指针，区别在于bind()会创建一个新的函数，只有经过调用才会执行。第一个参数同样是要指向的对象，后面的参数依次传入bind，不管是调用bind还是后续调用新函数。  
先看一个例子：  
```js  
var obj = {name:"Smiley"};  
var greeting = function(str, lang){  
    this.value = 'greetingValue';  
    console.log("Welcome "+this.name+" to "+str+" in "+lang);  
};  
var objGreeting = greeting.bind(obj, 'the world');  

objGreeting('JS');  // Welcome Smiley to the world in JS  
```  
以上代码中，greeting调用bind改变了this指向obj，'the world'变成greeting的第一个参数str，相当于初始化，再次调用objGreeting()时，传入的'JS'为greeting的第二个参数lang，按照顺序传入。  
```js  
/**  
 * context：bind要绑定的对象  
 */  
Function.prototype.bind1 = function(context){  
    let _this = this;  
    // 得到除去context外的传入参数  
    let args = Array.prototype.slice.call(arguments, 1);  

    // 返回一个函数，使用apply绑定context  
    return function(){  
         return _this.apply(context, args)  
    }  
}  

// equals to
Function.protytype.bind2 = function(context, ...params){
    let _this = this;
    return function(...args){
        // 拼接初始参数和后来传入的参数
        return _this.apply(context, parmas.concat(args))
    }
}

// 调用  
function fn1(a, b){  
    console.log('this', this)  
    console.log(a, b)  
    return 'fn1'  
}  
const fn2 = fn1.bind1({x: 1}, 10, 20)  
fn2();  
```  
## 6. 实现继承  
使用ES6实现继承：
* extends方法继承父类属性
* super中调用父类构造方法
```js
class Animal{
    constructor(number){
        this.number = number
        this.type = 'animal'
    }

    print(size){
        console.log(`${this.type} is ${size}`);
    }
}

class Cat extends Animal{
    constructor(number, food){
        super(number)
        this.type = 'cat'
        this.food = food
    }

    newPrint(){
        console.log('newPrint')
    }
}
```


## 7. 实现一个防抖函数  
函数防抖（debounce）：当事件处理函数执行后，要经过一段时间才能再次执行，在这段时间内，如果不断触发事件，每触发一次事件都会重新计时。  
比如点击按钮触发事件，设定防抖事件1000ms，当我持续点击按钮的时候，除了第一次执行，其他如果点击间隔小于1000ms，就不会执行事件，会一直重新计时。  
效果：频繁触发中只执行一次  
```js  
/**  
 * @param func 需要执行的函数  
 * @param wait 检测的防抖的时间间隔  
 * @return {可被调用的函数}  
 */  
function debounce(func, wait = 500){  
    let timer = null  // 设置timer计时器  

    // params为执行函数参数  
    return function(...params){  
        // 如果定时器有值，则清除定时器并置为空重新计时  
        if(timer){  
            clearTimeout(timer);  
            timer = null;  
        }  
        // 延迟执行函数，并用timer计时  
        timer = setTimeout(() => {  
            func.call(this, ...params)  // 此时this指向返回的匿名函数  
        }, wait)  

    }  
}  

// 调用举例  
function print(name){  
    console.log(name)  
}  
var dprint = debounce(print(name){  
    console.log(name)  
}, 1000)  
```  

## 8. 实现一个节流函数  
函数节流（throttle）：当持续触发事件时，事件处理函数会每隔一段时间执行，这段时间内最多只会执行一次。  
比如点击按钮触发事件，设定节流时间为1000ms，当我持续点击按钮时，每隔至少1000ms才会执行一次时间处理函数。  
效果：频繁触发中减少执行频率  
```js  
function throttle(func, delay){  
    // 记录当前执行时间  
    let preTime = 0  
    
    return function(...params){  
        let nowTime = Date.now();  
        if(nowTime - preTime >= delay){  
            preTime = nowTime  
            func.call(this, ...params)  
        }  
    }  
}  

```  
  
## 9. 实现 Object.create  
Object.create()就是以传入的对象作为原型，创建新的对象并返回  
```javascript  
/**  
* proto：传入的对象，作为原型  
*/  
function create(proto, properties = {}) {
    let newObj = {};
    newObj.__proto__ = proto;  // 链接原型

    // newObj上无其他属性
    Object.defineProperties(newObj, properties);
    return newObj;
}
```  

## 10. 实现一个浅拷贝  
浅拷贝是创建一个新对象，拷贝原对象的属性和值，如果属性为基本数据类型，则拷贝值，如果为引用数据类型，则拷贝的是一个引用地址，简单来说，新旧对象共享同一块内存，改变其中一个引用，会影响到另一个引用数据类型。  


## 11. 实现一个深拷贝  
深拷贝是从堆内存中开辟一个新的区域存放新对象，完整拷贝原对象，修改新对象不会影响原对象。  




## 12. 实现 Promise  

```js  
const PNEDING = 'pending'  
const RESOLVED = 'resolved'  
const REJECTED = 'rejected'  

function promise(fn){  
    // 保存初始状态  
    var self = this  

    // 初始化状态为pending  
    this.state = PENDING  

    // 用来保存resolve或reject传入的值  
    this.value = null    

    // 保存resolve的回调函数  
    this.resolveCallbacks = []  
    // 保存reject的回调函数  
    this.rejectCallbacks = []  

    // 状态转变为resolve方法  
    function resolve(value){  
        // 判断传入元素是否为一个Promise，若是则状态改变需要等待前一个状态改变完成  
        if(value instanceof promise){  
            return value.then(resolve, reject)  
        }  

        // 保证代码执行顺序为本轮事件循环末尾  
        setTimeout(() => {  
            // 当状态为pending时才能改变  
            if(state === PENDING){  
                self.state = RESOLVED  
                // 设置传入的值  
                self.value = value  
                // 指向回调  
                self.resolvedCallbacks.forEach((callback) => {  
                    callback(value)  
                })  
            }  
        }, 0)  
    }  

    // 状态改变为rejected方法  
    fuction reject(value){  
        // 保证代码执行顺序为本轮事件循环末尾  
        setTimeout(() => {  
            // 当状态为pending时才能改变  
            if(state === PENDING){  
                self.state = REJECTED  
                // 设置传入的值  
                self.value = value  
                // 指向回调  
                self.rejectedCallbacks.forEach((callback) => {  
                    callback(value)  
                })  
            }  
        }, 0)  
    }  

    // 将两个方法传入函数执行  
    try{  
        fn(resolve, reject)  
    } catch(e) {  
        // 遇到错误时，执行reject函数  
        reject(e)  
    }  
}  

// then方法  
promise.prototype.then = function(onResolved, onRejected){  
    // 首先判断两个参数是否为函数类型  
    onResolved =  
        typeof onResolved === 'function' ?  
            onResolved : function(value){ return value }  
    
    onRejected =  
        typeof onRejected === 'function' ?  
            onRejected : function(error){ throw error }  
    
    // 如果是等待状态，则将函数加入对应列表中  
    if(this.state === PENDING){  
        this.resolvedCallbacks.push(onResolved)  
        this.rejectedCallbacks.push(onRejected)  
    }  

    // 如果状态已经不可变，则直接执行对应状态函数  
    if(this.state === RESOLVED){  
        onResolved(this.value)  
    }  
    if(this.state === REJECTED){  
        onRejected(this.value)  
    }  
}  
```  

**Promise.all()**  
```js  
Promise.all = function(iterator){  
    if(!Array.isArray(iterator))  return;  
    let count = 0;  
    let res = [];  
    return new Promise((resolve, reject) => {  
        for(let item of iterator){  
            Promise.resolve(item)  
        }  
        .then(data => {  
            res[count++] = data;  
            if(count === iterator.length){  
                resolve(res);  
            }  
        })  
        .catch(e => {  
            reject(e);  
        })  
    })  
}  
```  

**Promise.race()**  
```js  
Promise.race = function(iterator){  
    return new Promise((resolve, reject) => {  
        for(let item of iterator){  
            Promise.resolve(item)  
            .then(data => {  
                resolve(data)  
            })  
            .catch(e => {  
                reject(e)  
            })  
        }  
    })  
}  
```  


## 13. 实现一个发布-订阅模式  
发布-订阅就是就是一个消息队列传送机制，订阅了某个事件的对象当该事件发布时（即发生时）会接收到相应的消息，然后执行对象中的回调函数。例如，当一些对象订阅了登录事件，则登录事件发生后，触发消息，然后就会执行所有订阅了登录事件的函数。  
所以，发布-订阅要实现一个订阅函数`on()`和一个发布函数`emit()`。当发布时，执行所有订阅了其消息的函数。  
```js  
class EventEmitter{  
    constructor{  
        // 事件对象，存放订阅事件的名称和相应回调函数  
        this.events = {};  
    }  
    // 订阅函数  
    on(eventName, callback){  
        // 如果不存在，则放入数组  
        if(!this.events[eventName])  
            this.events[eventName] = [callback];  
        // 如果已经存在该名称，则加入回调函数到数组尾部（一个事件  
        // 不止对应一个回调函数）  
        else  
            this.events[eventName].push(callback);  
    }  
    // 触发事件对应的方法  
    emit(eventName){  
        // 遍历执行所有的事件  
        this.events[eventName].forEach(fn => fu())  
    }  
}  
```  

## 14. 实现函数的柯里化  
柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。  
举例：  
```js  
function add(num1, num2){  
    return num1 + num2;  
}  
// 一次传入两个参数  
add(2, 3);  // 5  

// 假设有一个curry函数进行柯里化  
var curryAdd = curry(add);  
curryAdd(2)(3);  // 5  
```  
函数柯里化本质就是创建一个闭包，保存参数，当参数数量达到函数执行要求时，执行函数。  
实现：  
```js  
function curry(fn){  
    // 得到剩余的参数  
    var args = Array.prototype.slice.call(arguments, 1);  
    return function(){  
        // 得到调用函数时新传入的参数  
        var newArgs = Array.prototype.slice.call(arguments);  
        var finalArgs = args.concat(newArgs);  // 最终所有参数  
        return fn.apply(null, finalArgs)  
    }  
}  
```  

## 15. 数组的扁平化 flat() 方法  
数组的扁平化指的就是数组的降维，将一个数组中内部的所有数组都进行展开。  
效果如下：  
```js  
let arr = [  
    1,  
    [3, 5, 6],  
    [7, [7, 8], 9, 11],  
    12  
];  

function flat(arr){  
    // 验证arr中，还有没有深层数组[1,2, [3,4]]  
    const isDeep = arr.some(item => item instanceof Array)  
    if(!isDeep){  
        return arr  // 已经扁平，直接返回  
    }  
    
    // 主要依靠concat可以先拼接数组，扁平化一层  
    const res = Array.prototype.concat.apply([], arr)  
    return flat(res)  // 递归  
}  

const a = flat(arr); // [1,3,5,6,7,7,8,9,11,12]，不改变原数组  
console.log(a)  
```  
### (1)递归实现  
循环数组中的每一个元素，判断该数组是否为数组，如果是数组，则循环遍历该数组，否则直接将元素添加到新数组中。  
```js  
function myFlat(){  
    // 保存this，即原数组arr  
    let _this = this;  
    let newArr = [];  // 操作新数组，因此不改变原数组  

    // 定义一个递归函数，用来遍历其中的元素  
    let cycle = function(arr) {  
        for(let i = 0; i < arr.length; i++){  
            let item = arr[i];  
            if(Array.isArray(item)){  
                cycle(item);  // 是数组就向下递归  
                continue;  
            }  
            else  
                newArr.add(item);  
        }  
    }  

    cycle(_this); // 执行该函数  
    return newArr;  
}  

Array.prototype.myFlat = myFlat;  // 一定要添加到数组原型上，不然没法调用  
```  
### (2)toString()实现  
```js  
function myFlat(arr){  
    // 将原数组展开  
    const res = arr.toString().split(',');  
    // 过滤掉空数组，然后将字符串转换为Number类型  
    return result = res.filter(item => item !== "").map(Number);  
}  

// 注，这样写就直接调用  
myFlat(arr);  
```  

## 16. 基于Promise封装Ajax  
Promise主要使用两种状态，resolve和reject，可以根据XHR对象的状态码来设置，然后返回Promise实例，基本思路如下：  
（1）直接返回一个新的Promise实例（以下在实例中操作）  
（2）创建一个XMLHttpRequest对象  
（3）调用open()方法，设置url，与服务器建立连接  
（4）监听Ajax状态信息onreadystatechange（注意要先设置监听再发送请求，否则可能收不到响应）  
（5）当xhr.readyState == 4（服务器响应完成，可以获取其中数据了）  
    * xhr.status == 200：服务器响应成功，置为resolve  
    * xhr.status == 404：服务器响应失败，置为reject  
```js  
function ajax(url, method){  
    return new Promise((resolve, reject) => {  
        var xhr = new XMLHttpRequest();  
        xhr.open(url, method, true);  // 异步发送  
        // 事件监听  
        xhr.onreadystatechange = function(){  
            if(xhr.readyState == 4){  
                if(xhr.status == 200)  
                    resolve(xhr.responseText);  
                else if(xhr.status == 404)  
                    reject(new Error('404'));  
            }  
            else  
                reject('请求失败');  
        };  
        // 发送请求（注意先设置监听再发送请求）  
        xhr.send(null);  
    });  
}  
```  
## 17. 实现一个sleep函数  
等待一段时间，就去执行某个函数，基于Promise实现  
```js  
function sleep(wait){  
    return new Promise((resolve, reject) => {  
        setTimeout(() => {  
            resolve();  
        }, wait);  
    });  
}  

const print = (name) => { console.log(name) }  

// 使用await调用  
async function autoRun(){  
    await sleep(2000);  
    let name1 = print("z");  
}  
autoRun();  
```  

## 18. 创建10个`<a>`标签  
```js  
let a;  
for(let i = 0; i < 10; i++){  
    a = document.createElement('a');  
    a.innerHTML = i + '<br>'  
    a.addEventListener('click', function(e){  // e为事件对象  
        // 取消事件的默认行为  
        e.preventDefault();  
        alert(i);  // 按照标签序号弹出  
    })  

    document.body.appendChild(a);  
}  
```  

## 19. 手写一个Promise加载图片  
```js  
// 手写一个Promise加载图片  
function getPic(url){  
    return new Promise((resolve, reject) => {  
        const img = document.createElement('img')  
        img.onload = () =>{  
            resolove(img)  
        }  
        img.onerror = () => {  
            const err = new Error(`error ${src}`)  
            reject(err)  
        }  
    })  
}  

const url = "http://www.picurl.com"  
getPic(url).then(img => {  
    console.log(img.width)  
    return img  
}).then(img => {  
    console.log(img.height)  
}).catch(err => {  
    console.log(err)  
})  
```  

## 20. 基于Promise手写一个简易ajax  
```js  
function ajax(url){  
    return new Promise((resolve, reject) => {  
        const xhr = new XMLHttpRequest();  
        xhr.open('GET', url, true);  
        xhr.onreadystatechange = function() {  
            if(xhr.readyState === 4){  
                if(xhr.status === 200){  
                    resolve(JSON.parse(xhr.responseText))  
                }  
                else if(xhr.status === 404){  
                    reject(new Error('404 not found'))  
                }  
            }  
        }  
        xhr.send(null)  // 不要忘记  
    })  
}  

const url = '/data/test.json'  
ajax(url)  
.then(res => console.log(res))  
.catch(err => console.log(err ))  
```  