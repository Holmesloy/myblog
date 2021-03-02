# HTML

## HTML5的新特性
（1）语义化标签：header、footer、nav、aside  
（2）增强型表单：input的多个type（color、data、email、url）  
（3）新增表单属性：placeholder、required、min和max、step、height和width  
（4）音频视频：audio、video  
（5）canvas  
（6）本地存储：localStorage、sessionStorage  
（7）新事件：onresize、ondrag、onscroll、onpause  
（8）WebSocket  

## 语义化标签的作用
* 贴合实际语义，易于理解和记忆，增强可读性
* 样式丢失时可以使页面呈现较为清晰的结构（如若全是div则结构会混乱）
* 方便其他设备解析，渲染网页
* 有利于SEO（让搜索引擎更容易读懂）
* 便于团队开发和维护，遵循W3C标准，减少差异化
注：W3C（万维网联盟），致力于发展Web规范，制定标准，解决Web应用中不同平台、技术的不兼容等问题

## link和@import的区别
* link是HTML提供的标签，不仅可以加载样式，还可以加载其他资源，如图片、脚本等。而@import只能用于加载CSS文件
* 多个link引入的文件可以并行解析，而@import要等到页面加载完成之后才开始加载
* 可以使用js操作DOM动态引入link，@import只能用于CSS
* link引入的样式权重大于@import

## src和href的区别
* src（source），属性中可以设置src的标签一般为替换标签，用于将资源加载后替换该标签的内容，src加载的资源会阻塞DOM解析
* href（hypertext reference），属性中可以设置href的标签一般为引用或者链接标签，用于引用互联网上其他资源或者锚点，引用的资源不会阻塞DOM解析，而是并行加载

## script中async和defer的区别
* async：并行加载，加载完成立即执行加载的资源，会打断DOM解析
* defer：并行加载延迟执行，加载完成后等待DOM解析完成后再执行
* async资源执行的顺序不可控，先加载完的资源先执行；defer加载完成后的资源按照加载开始顺序放在队列中，DOM解析完成后依次执行

## DOCTYPE的作用
<!DOCTYPE>声明一般位于第一行，用于告诉浏览器以什么样的模式来解析文档，如果不存在的话文档以兼容模式呈现。  
一般指定之后会以标准模式进行文档解析，浏览器按照最新标准进行解析。否则以兼容模式进行解析，浏览器会以向后兼容的方式确保一些老的网站可以正常访问。  
`<meta>` 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。

## localStorage，sessionStorage和cookie
![storage](@alias/storage.png)

## canvas与SVG


