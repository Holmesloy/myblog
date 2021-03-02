# 浏览器  

## 浏览器渲染流程  
1. 解析HTML，生成DOM树  
2. 解析CSS，生成CSS规则树  
3. 解析Javascript，主要通过DOM API和CSSOM API操作  
4. 通过DOM树和CSS规则树来生成渲染树（渲染树与DOM树的区别如Header不放在渲染树中，或者display:none的元素等）。  
5. 绘制render树  

 


## 错误处理与调试  
### try-catch语句  
```js  
try {  
    // 可能导致错误的代码  
} catch(error){  
    // 发生错误时的处理  
}  
```  
try中的代码发生错误时，会自动退出执行然后执行catch块，catch块得到一个错误对象，该对象中有一个错误消息message属性和一个错误类型的name属性。  
(1) finally字句  
如果代码中存在finally语句，那么其中的代码必定执行，所以如果有finally语句则catch语句就不是必要的了。  
```js  
function(){  
    try{  
        return 1;  
    } catch{  
        return 2;  
    } finally{  
        return 3;  
    }  
}  
```  
以上代码中，try正常执行时，finally也会执行，所以最终会返回3覆盖了1，如果catch执行的话，finally也会执行，最终同样返回3。  
(2) 错误类型  
* Error：基类型，常用于开发者自定义抛出错误  
* ReferenceError：访问不存在的变量时，找不到对象时  
* SyntaxError：语法错误的js字符串传入eval()函数时  
* TypeError：执行操作时变量的类型不符合要求  
* EvalError：使用eval()函数错误时  
* RangeError：数值超出相应范围时  

```js  
var obj = x;  // ReferenceError  

eval("a ++ b");  // SyntaxError  

var o = new 10;  // TypeError  
alert("name" in true);  // TypeError  
Function.protytype.toString.call("name"); // TypeError  
```  
(3) 抛出错误  
`throw + 数据类型`用于抛出自定义错误，遇到throw时，代码会停止执行，除非有try-catch语句捕获到被抛出的值，才会继续执行。  
可以使用内置错误类型抛出错误：  
`throw new Error("error")`  
`throw new TypeError("error")`  
(4) 错误事件  
没有通过try-catch语句处理的错误都会触发window对象的error事件  
```js  
window.onerror = function(message, url, line){  
    alert(message);  
}  
```  
### 调试（Chrome）  
**(1) console对象**  
用于将消息记录到控制台  
* log(message)：一般消息或自定义消息  
* error(message)：错误消息  
* info(message)：消息性消息  
* warn(message)：警告消息  

**(2) Application**  
LocalStorage、SessionStorage、Cookie设置和删除  
**(3) NetWork** 
根据类型查看资源加载情况  
**(4) Source**  
存放着源代码，在代码中添加debugger或者在浏览器中手动点击添加，可以在浏览器原文件中打断点  

### 抓包  
* 移动端h5页，查看网络请求，需要工具抓包  
* windows：fiddler  MacOS：charles  

过程：  
* 手机电脑连接同一个局域网  
* 将手机代理到电脑上（wifi中手机代理修改为电脑网络地址）  
* 手机浏览网页，即可抓包  
* 查看网络代理  
* 网址代理  
* https  

## 同源策略  
为了保证用户信息的安全，防止恶意网站窃取数据  
* 协议相同  
* 域名相同  
* 端口号相同  

**限制范围：**  
（1）Cookie、LocalStorage和IndexDB无法读取  
（2）DOM无法获得  
（3）Ajax请求不能发送  

## JSONP  
* `<script>`可绕过跨域限制  
* 服务器可以任意动态拼接数据返回  
* 所以，`<script>`就可以获得跨域的数据，只要服务器正确设置了数据  

JSON with padding（填充式JSON或参数式JSON），由两部分构成：回调函数和数据。回调函数是响应到来时的处理函数，而数据就是响应得到的JSON数据，传入回调函数中处理。  
JSONP也可以通过动态`<script>`元素实现，使用时将其src属性指定一个跨域的URL，其不受限制从其他域来加载资源。  
加载图片、css、CDN和js中使用的`<img/>`，`<link>`，`<script>`不受同源策略影响。  
```js  
<script type="text/javascript">
// 处理函数  
function handleResponse(response){  // response即为响应数据  
    alert("I am response data:" + response);  
}  

var script = document.createElement("script");  
script.src = "http://...";  // 设置src  
// 插入到某处  
document.body.insertBefore(script, ...);  
</script>
```  
优点：简单易用且能直接访问响应文本。  
缺点：从其他域中加载代码执行，若响应中夹杂恶意代码，则安全性得不到保证。另外，无法确定其请求是否失败，通常采用超时的办法进行检测是否接收到数据。  

## 跨域资源共享（CORS）  
实现CORS通信的关键是服务器,服务器需要实现CORS接口。  
整个CORS通信过程由浏览器自动完成，浏览器一旦发现Ajax请求跨域，就会自动添加一些附加的头信息。  
**请求类型：简单请求和非简单请求**  
满足以下条件则为简单请求：  
* 请求方法为GET或POST  

HTTP头部信息不超出以下字段：  
* Accept  
* Accept-Language  
* Content-Language  
* Last-Event-ID  
* Content-Type  
### 简单请求流程  
浏览器直接发出CORS请求，即在头信息中添加一个`Origin`字段。  
`Origin`用来说明本次请求来自哪个源（协议+域名+端口）。服务器根据这个值，决定是否同意本次请求。  
如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的HTTP响应。浏览器得到回应的头信息不包含`Access-Control-Allow-Origin`字段，就知道出错了。  
如果`Origin`指定域名在许可范围内，服务器返回的回应会多出几个字段：  
```HTML  
Access-Control-Allow-Origin: http://api.example.com  
Access-Control-Allow-Credentials: true  
Access-Control-Expose-Headers: FooBar  
Content-Type: text/html; charset=utf-8  
```  
* Access-Control-Allow-Origin：必须字段，值为请求时Origin字段值或者*，表示接受任意域名请求。  
* Access-Control-Allow-Credentials：可选字段，布尔值，表示是否允许发送Cookie，为true说明允许发送Cookie（注：只有true没有false，不允许发送直接删除该字段）。  
* Access-Control-Expose-Headers：可选，表示如果想得到其他字段，则在此指定，如以上就返回了FooBar字段。  

**withCredentials属性**  
CORS请求默认不会发送Cookie与HTTP认证信息，如果要把Cookie发送给服务器，除了服务器端指定`Access-Control-Allow-Credentials`为true外，还要在Ajax请求中打开`widthCredentials`属性  
```js  
var xhr = new XMLHhhpRequest();  
xhr.widthCredentials = true;  
```  
否则，即使服务器同意发送Cookie，浏览器也不会发送。  
注意，若发送Cookie则`Access-Control-Allow-Origin`不能为*，需要设置具体域名。  
### 非简单请求流程  
非简单请求如PUT或DELETE等，或者`Content-type`字段类型为`application/json`。  
**预检请求**  
非简单请求会在正式通信之前，增加一次HTTP查询请求。  
浏览器先询问服务器，域名是否在白名单中，以及可以使用哪些请求和头信息字段，得到肯定答复浏览器才会发出正式的XMLHttpRequest请求，否则报错。  
如以下一段Javascript脚本：  
```js  
var url = "http://api.example.com";  
var xhr = new XMLHttpRequest();  
xhr.setRequestHeader('My-Header', 'value');  
xhr.send();  
```  
浏览器执行代码时，发现这是一个非简单请求，因此自动发出一个预检请求如下：  
```HTML  
OPTIONS/cors HTTP/1.1  
Origin:http://api.example.com  
Access-Control-Request-Method: PUT  
Access-Control-Request-Headers: My-Header  
Host: api.example.com  
Accespt-Language: en-US  
Connection: keep-alive  
User-Agent: Mozilla/5.0...  
```  
预检请求使用的方法是`OPTIONS`，头信息中关键字段是`Origin`，两个特殊字段如下：  
* Access-Control-Request-Method：必须，用来列出浏览器的CORS请求会用到哪些HTTP方法。  
* Access-Control-Reques-Headers：可选，逗号分隔的字符串，指定浏览器CORS请求会发送的额外的头信息字段。  

**预检请求回应**  
服务器收到预检请求后，会检查`Origin`，`Access-Control-Request-Method`和`Access-Control-Request-Headers`，确认允许跨源请求后跨源作出回应：  
```HTML  
// 省略了一些内容  
Access-Control-Allow-Origin: http://api.example.com  
Access-Control-Allow-Methods: GET, POST, PUT  
Access-Control-Allow-Headers: X-Custom-Header  
Content-Type: text/html; charset=utf-8  
```  
如果服务器否定了预检请求，则会返回一个正常的HTTP回应，但是没有以上头信息字段，这时浏览器会触发一个错误，可以被`XMLHttpRequest`对象的`onerror`回调函数捕获。  

**浏览器的正常请求和回应**  
如果服务器通过了预检请求，则以后每次浏览器会发送正常的CORS请求，和简单请求相同。  

### 与JSONP的比较  
CORS比JSONP更强大。  
JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSON支持老式浏览器，然后能向不支持CORS的浏览器请求数据。  

## 运行环境  
* 运行环境即浏览器（sever端有nodejs）  
* 下载网页代码，渲染出页面，期间会执行各种js代码  
* 保证代码在浏览器中：稳定且高效  

### 网页加载过程  
* DNS解析：域名->IP地址  
* 浏览器根据IP地址向服务器发起http请求  
* 服务器处理http请求，并返回给浏览器  
* 根据HTML代码生成DOM  
* 根据CSS代码生成CSSOM  
* 将DOM Tree和CSSOM结合形成Render Tree  
* 根据渲染树渲染页面  
* 遇到`<script>`则暂停渲染，优先加载并执行js代码，完成再继续渲染完成

**为什么css放在head中？**  
如果放在后面，可能造成一开始渲染时没有css，后来解析到css，又重新渲染  
**为什么js放在body最后？**  
因为js会阻塞渲染，本着页面优先显示的原则，让整个页面结构先展现在用户面前，然后再统一执行js代码，完成渲染。否则，中间可能卡住去执行js，不利于用户体验。注：img标签不会阻塞DOM渲染，遇到img可以继续向下渲染，图片加载出来之后再补上去即可。  
**window.onload和DOMContentLoaded**  
```js  
window.addEventListner('load', function(){  
    // 页面的全部资源加载完成才会执行，包括图片、视频等  
})  
document.addEventListner('DOMContentLoaded', function(){ // 用得更多  
    // DOM渲染完即可执行，此时图片、视频可能还没加载完成  

})  
```  

### 性能优化  
**原则：**  
* 多使用内存、缓存或其他方法  
* 减少CPU计算量，减少网络加载耗时  
* 适用于所有编程的性能优化：空间换时间  

雪碧图  
**让加载更快**  
* 减少资源体积：压缩代码，如压缩图片，webpack压缩代码等  
* 减少访问次数：webpack合并代码，缓存，SSR服务器端渲染  
* 使用更快的网络：CDN（根据区域选择服务器，也可以触发缓存机制）  

**让渲染更快**  
* css放在head中，js放在body最下面  
* 尽早开始执行js，用DOMContentLoaded触发  
* 懒加载（图片懒加载，上滑加载更多）  
* 对DOM查询进行缓存，合并频繁DOM操作  
* 节流throttle  防抖debounce    

**缓存**  
* 静态资源加hash后缀，根据文件内容计算hash  
* 文件内容不变，则hash不变，url也不变  
* url和文件不变，则会自动触发http缓存机制，返回304  

**SSR服务器渲染**  
* 将网页和数据一起加载，一起渲染  
* 非SSR（前后端分离）：先加载网页，再加载数据，再渲染数据  

**懒加载**  
```html  
<img id='img1' src="preview.png" data-src="abc.png">  
<script type="text/javascript">  
    var img1 = document.getElementById('img1')  
    // 一些操作  
    img1.src = img1.getAttribute('data-src')  
</script>  
```  
以上代码中，有一张图片，默认src是preview.png，表示显示的是一个预览图，因为预览图比较小，后面的data-src是我们自己定义的属性。js中可以监听事件，比如当用户向下滑到了这张图片，我们就将其src设置为原大图，以此实现图片的懒加载。  

**防抖debounce**  
* 监听一个输入框，文字变化后触发change事件  
* 若直接监听keyup，则会频繁触发change事件  
* 防抖：用户输入结束或暂停时，才会触发change事件（参见百度搜索时的提示）  

```js  
const input1 = document.getElementById('input1')  
const timer = null  

input1.addEventListner('keyup', funciton(){  
    if(timer){  
        //这里清空计时器的意思是若用户在500ms内又输入了，则定时器要重新赋值，所以先清空  
        clearTimeout(timer)  
    }  
    timer = setTimeout(() => {  
        // 模拟触发change使劲按  
        cosole.log('change')  

        // 清空定时器，表示重新开始  
        timer = null  
    }, 500)  
})  

// 封装为防抖函数  
function debounce(fn, delay = 500){  
    // timer是在闭包中  
    let timer = null  

    return function(){  
        if(timer){  
            clearTimeout(timer)  // 清除了定时器和任务
        }  
        timer = setTimeout(() => {  
            fn.apply(this, arguments)  
            timer = null  
        }, delay)  
    }  
}  

// 调用  
input1.addEventListener('keyup', debounce(function() { // 注意，用了this就不能用箭头函数  
    console.log(input1.value)  
    }, 600))  
```  

**节流**  
* 拖拽一个元素时，要随时拿到该元素被拖拽的位置  
* 直接用drag事件，则会频繁触发，容易导致卡顿  
* 节流：无论拖拽速度多块，都会每隔100ms触发一次  

```js  
const div1 = document.getElementById('div1')  
let timer = null  // 不能将null赋给const变量  

document.addEventListener('div1', function(e){  
    if(timer){  
        return  
    }  
    timer = setTimeout(() => {  
        console.log(e.offsetX, e.offsetY)  

        timer = null  
    }, 100)  
})  

// 封装节流函数  
function throttle(fn, delay = 100){  
    let time = null  

    return function(){  
        if(timer){  
            return  
        }  
        timer = setTimeout(() => {  
            fn.apply(this, arguments)  
            timer = null   // timer不执行是不会重新赋值为null的
        }, delay)  
    }  
}  

// 调用  
div1.addEventListner('drag', throttle(function(e) {  
        console.log(e.offsetX, e.offsetY)  
}, 200))  
```  
### 安全    
**XSS攻击**  
举例：  
* 一个博客网站，写一篇博客，其中嵌入`<script>`脚本  
* 脚本内容：获取cookie，发送到我的服务器（服务器配合跨域）  
* 发布这篇博客，如果有人查看，则可以获取访问者的cookie  

预防：  
* http: only
* 替换特殊字符，如 `<` 变为 `&lt;` ，`>` 变为 `&gt;`;  
* 则`<script>`变为&lt;script&gt;，从而直接显示，不会作为脚本执行  
* 前端要替换，后端也要替换  

**CSRF跨站请求伪造攻击**  
举例：  
用户正在浏览网站，如淘宝，已经登陆，这时候收到攻击者的一封邮件，里面有一个链接，点击之后可能会发生一些操作，因为这时候带着用户的个人信息进入的该网站  


预防：  
* 使用post接口  
* 增加验证，例如密码、短信验证等  


## 兼容性问题
### 样式兼容性（CSS）
* 由于历史原因，不同浏览器默认样式（如margin和padding）存在差异，开发时可以先设置reset.css，重置全局样式
```css
/* 如使用通配符 */
* {
    margin: 0;
    padding: 0;
}
```
* 目前仍有部分属性需要加上浏览器前缀进行兼容，如`transform, transition,border-radius,flex`等

|内核|浏览器|前缀|
|:--|:--|:--|
|Trident|IE浏览器|-ms|
|Gecko|Firefox|-moz|
|Presto|Opera|-o|
|Webkit|Safari|-webkit|
```css
-moz-     /* 火狐浏览器 */
-webkit-  /*Safari, 谷歌浏览器等使用Webkit引擎的浏览器 */
-o-       /*Opera浏览器(早期) */
-ms-      /*IE浏览器*/
```

### 交互兼容性（Javascript）
* 事件兼容性问题：可以封装一个适配器方法，过滤事件绑定、移除、冒泡阻止与默认事件的行为处理
```js
var  helper = {}

//绑定事件
helper.on = function(target, type, handler) {
    if(target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else {
        target.attachEvent("on" + type,
            function(event) {
                return handler.call(target, event);
            }, false);
    }
};

//取消事件监听
helper.remove = function(target, type, handler) {
    if(target.removeEventListener) {
        target.removeEventListener(type, handler);
    } else {
        target.detachEvent("on" + type,
        function(event) {
            return handler.call(target, event);
        }, true);
    }
};
```
### 浏览器hack
通过判断浏览器的种类来进行不同的处理：
* IE：`<!--[if IE 9]> 我是IE9 <![endif]-->`
* Safari：`var isSafari = /a/.__proto__=='//'`
* Chrome：`var isChrome = Boolean(window.chrome)`