---  
title: JS代码输出  
date: 2021-04-03 
categories:  
 - frontEnd  
tags:  
 - js  
---  
### 1*
```js
if(false){
    var a = 1
    let b = 2
}
console.log(a)
console.log(b)
```
* let会产生块级作用域，var不会产生块级作用域
* 因此if中无论条件是什么，其中a已经发生变量提升，但为false时其中代码不会执行
* 结果：
```js
undefined
ReferenceError: b is not defined
```
### 2
```js
var a = 1;
if(true){
    console.log(a);
    let a = 2;
}
```
* let声明的变量存在暂存性死区，let声明变量之前访问会报错
* 结果：`ReferenceError: Cannot access 'a' before initialization`

### 3
```js
console.log(c);
var c;
function c(a) {
    console.log(a);
    var a = 3;
    function a(){
    }
}
c(2);
```
* 变量声明优先级：函数声明 > arguments > 变量声明
* 因此console输出的结果都是函数
* 结果：
```js
function c(a) {
    console.log(a);
    var a = 3;
    function a(){
    }
}
function a(){
}
```

### 4*
```js
var c = 1;
function c(c) {
    console.log(c);
    var c = 3;
}
console.log(c);
c(2);
```
* 函数声明优先提升，然后var c就处在函数声明下方，因此c为1，c(2)不是一个函数
* 结果：
```js
1
TypeError: c is not a function
```

### 5*
```js
var a = 10;  
function test() {  
    a = 100;  
    console.log(a);  
    console.log(this.a);  
    var a;  
    console.log(a); 
}
test();  
```
相当于：
```js
function test(){
    var a
    a = 100
    console.log(a)
    console.log(this.a)
    console.log(a)
}
var a = 10
test()
// 输出
100
10
100
```

### 6*
```js
var name = 'erdong';
(function () {
    if (typeof name === 'undefined') {
        name = 'chen';
        console.log(name);
    } else {
        console.log(name);
    }
})();
```
* 立即执行函数整体不会变量提升，这时能获取到外部name的值，然后name被赋值为chen
* 若var name在立即执行函数下方，则输出空字符串

### 7*
```js
var a = 1;

function c(a, b) {
    console.log(a);
    a = 2;
    console.log(a);
}
c();
```
* 函数中未传入实参，因此a，b的值都为undefined
* a赋值为2之后即可输出，全程与外部的a无关，若无形参可正确获取到外部的a
* 结果：undefined 2

### 8*
```js
var val=1;
var obj={
    val:2,
    del:function(){
        console.log(this);                    
        this.val*=2;
        console.log(val);
    }
}
  
obj.del();
```
* this绑定为obj，this.val * 2，obj中的val变成了4
* 但是函数中并没有定义val，因此val需要去外部寻找，最终为1，注意this.val与val的区别，关键在于this的指向
* 结果：obj  1

### 9*
```js
(function() {
  var a = b = 3;
})();
console.log(typeof a === 'undefined');
console.log(typeof b === 'undefined');
```
* 首先明确var a = b = 3如何执行，相当于`b = 3;  var a = b`
* 立即执行函数中，b未使用var声明，为全局变量，而a为函数作用域中的局部变量
* 因此，外部访问a为`ReferenceError: a is not defined`，访问b`b = 3`
* 结果： true  false


