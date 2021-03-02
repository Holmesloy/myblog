计算器  
and  
2048 game  
// 设计，js功能逻辑，dom操作，html与css布局，简单动画  

* 个人网站与后台管理系统  
框架：vue3.0 + elementui + typescript  
网页布局：Flex和Sass  
打包工具：Webpack  
数据传递：axios数据获取，vuex数据共享  

* WebAPP音乐播放器  
Flex布局与Rem适配方案  
模板字符串传递数据  

组件、css作品  

**问题**  
1. 挑一个你做的比较好的项目说说？  
2048  


2. 你做的项目有什么难点？  



3. 第一家实习公司做的项目？  
项目描述：  
技术栈：权限设计  
解决的问题：  
难点：列表数据加载缓慢、组件复用问题、组件二次封装问题、浏览器样式和兼容性问题、后端请求失败问题、vuex数据问题、缩放问题  
优化：  


4. 第二家实习公司做的项目？  
响应太慢，项目架构  



5. 你的缺点是什么？  
   对以前做的东西缺少记录，如技术问题、项目问题，另外，目前技术栈不够全面，如nodejs、typescript、小程序和Native app的开发。架构设计能力和实现能力较差。  
   经验较少，进一步强化基础并应用到实际项目中。  


6. 你的优点是什么？  
   对自己的工作比较认真负责，同时有不断进取的意识，明白不进步就是退步。愿意将自己的大部分时间花在工作和学习上，同时也有比较广泛的爱好，心态也比较积极开放。  




7. 未来规划  
   首先是先完善自己的技术栈，学习ts，nodejs和小程序开发，因为只有当很多必须的知识掌握后，才能对前端有着更为深刻的理解。然后还要去学习前端工程化的知识，补足短板，强化基础，熟悉业务模式与解决方案，在实践中学习和进步。等到这些知识掌握了之后，可能再去思考未来的方向，先把当下的事情做好。  


8. 你是如何学习的  
   主要途径有三种：博客、书籍、视频。其中，博客可以更快地去了解或者补足某一方面的知识。然后书籍是系统化的讲解与背后的逻辑。视频是可以有老师带着你学习新的知识，讲解自己学习中可能经常忽略的点与一些难理解的地方。也可以带人开阔思路，get新的学习方法或者技术解决方案等。然后对自己学过的知识作记录。过一段时间后去复习和总结。  


   


1. 性能优化  
   * 网络请求相关  
   * 构建相关  
   * 静态资源优化  
   * 编码相关  

**网络请求相关**  
* cdn  

2. 合理的缓存策略  
* 将长时间不会改变的第三方库或静态资源设置为强缓存，将max-age设置为一个较长的时间，max-age=2592001（一个月）.再将访问路径加上hash，若hash值变化则保证获取到最新资源（webpack配置）  
* 对于index.html和一些图片资源，可以设置协商缓存  

3. 资源嗅探  
* link标签可以添加preload, prefetch,dns-prefetch属性  
* SPA应用中，浏览器解析完script脚本才会生成DOM节点  
* 若首屏图片比较耗时，则将其放在preload标签中让浏览器预先请求并加载执行，这样当脚本执行完毕后可以瞬间加载图片，否则要此时再去请求图片  
* prefetch可以让浏览器提前加载下个页面可能会需要的资源,vue-cli3默认会给所有懒加载的路由添加prefetch属性，这样可以在你访问使用到懒加载的路由页面时能够获得更快的加载速度  
* preload和prefetch的区别在于，preload的资源会和页面需要的静态资源并行加载，而prefetch则会等到浏览器加载完必要的资源后，在空闲时间加载被标记为prefetch的资源  

**构建相关**  
1. 路由懒加载（懒加载会额外增加一个http请求）  
* 通过import()使得ES6的模块有了动态加载的能力，让url匹配到相应的路径时，会动态加载页面组件，这样首屏的代码量会大幅减少，webpack会把动态加载的页面组件分离成单独的一个chunk.js文件  


**静态资源优化**  
1. 图片懒加载  
   将占位的图片替换成真正的图片，然后给img标签设置一个自定义属性data-src存放真正的图片地址，src存放占位图片的地址  
   监听scroll时间并作节流处理  
2. 使用svg图标  
   svg拥有更好的图片质量，体积更小，并且不需要开启额外的http请求  
3. 压缩图片  

**编码相关**  
1. 合并频繁DOM操作，创建片段，对DOM查询做缓存  
2. 注意使用函数节流和防抖  
3. 小技巧：  
   使用require.context这个webpack的api可以避免每次引入一个文件都需要显式的用import导入，它可以扫描你指定的文件，然后全部导入到指定文件，可以用在  

vue-router的路由自动导入  
vuex的模块自动导入  
svg图标的自动导入  
全局组件的自动导入  
这样在创建一个新的模块时,不需要在index.js中用import引入,在modules中再声明一遍了  


### 封装组件  
基于elementui组件进行二次封装  
思路：  
* 高内聚低耦合，尽量少暴露组件api，功能封装在组件内部  
* 组件内部根据业务需求设置了一些默认配置项，另外通过不同页面传入不同配置项提高组件的通用性  


eBay：  
ebay的一个云平台，由altus ui sdk扩展plugin插件，每个由四个部分组成，组件、路由、Actions、Store，由react和redux进行实现。  
终端用户直接访问http：go/altus。  
而该网址背后经过了一系列处理:  
* Altus UI Core发布到github，然后使用cdn加载静态资源  
* plugins同上发布  
* plugins还要注册到插件仓库，所以网址中就可以获得插件列表信息  
* altus web运用web server将html显示到该网址  
* 因此，该网址的组成：html + get plugin list + altus 核心静态资源  

workloads：插件用来查看运行服务的当前工作负载、状态信息、运行信息、cName信息（CNAME记录就是把域名解析到另外一个域名）  
CNAME将几个主机名指向一个别名，其实跟指向IP地址是一样的，因为这个别名也要做一个A记录的。但是使用CNAME记录可以很方便地变更IP地址。如果一台服务器有100个网站，他们都做了别名，该台服务器变更IP时，只需要变更别名的A记录就可以了。  
一个 CDN 网络往往有非常多的边际(edge)节点，当你购买了 CDN 服务又想用自己的域名的时候，直接把你的域名 CNAME 到 CDN 的域名就好了，然后当用户连接的时候往往能够连接到他们最近的节点。  

### 项目记录  

**基础**  
1. 封装axios  
2. 跨域问题  
   用cors来解决，dev环境也可以通过 webpack-dev-server的proxy来解决，开发环境用nginx反代理一下就好了  
3. 前后端交互  
   前后端和产品一起开会讨论项目，之后后端根据需求，首先定义数据格式和api，然后 mock api 生成好文档，我们前端才是对接接口的。这里推荐一个文档生成器 swagger。前端也可以自己使用easy-mock。另外，图标上阿里的iconfont比较好用  
4. 相同Vue组件不同的router  
   如创建和编辑的页面使用一个component，默认情况下不会触发created或者mounted钩子，因此数据都在上面，可以通过router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子了  
   ```js  
   <router-vie :key="key"></router-vie>  
   computed:{  
      key(){  
         // 给router加一个时间让其key变化  
         return this.$route.name !== undefined?this.$route.name + +new Date(): this.$route + +new Date()  
      }  
   }  
   ```  

**登录权限**  
* 不同的权限对应着不同的路由，同时侧边栏也需根据不同的权限，异步生成。  
设计思路：  
* 登录：用户填写用户名密码，服务器验证并返回一个token，拿到token之后，将token贮存到cookie中，来保证页面刷新后能记住用户登录状态。然后根据token再去使用一个user_info的接口来获取用户的详细信息。  
* 权限验证：通过token获取用户对应的role，动态根据用户的role算出其对应有权限的路由，通过router.addRoutes动态挂载这些路由。  
* 上述所有数据和操作通过vuex全局管理。（注：刷新页面后vuex内容也会丢失，所以需要重复上述操作）  

**登录篇**  
1. 用户输入时前端可以加入校验，然后click触发登录操作，使用action和dispatch来获取数据，设置添加token到cookie，再执行相应跳转。  
2. 为了保证安全性，后台所有token有效期(Expires/Max-Age)都是Session，就是当浏览器关闭了就丢失了，后端也会在每周固定一个时间点重新刷新token。  
3. 用户登录成功后，使用全局钩子`router.beforeEach`中拦截路由，判断是否已经获得token，若已获得token则取获取用户的基本信息。  
```js  
//router.beforeEach  
if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息  
  store.dispatch('GetInfo').then(res => { // 拉取user_info  
    const roles = res.data.role;  
    next();//resolve 钩子  
  })  
```  
注：假设我把用户权限和用户名也存在了本地，但我这时候用另一台电脑登录修改了自己的用户名，之后再用这台存有之前用户信息的电脑登录，它默认会去读取本地 cookie 中的名字，并不会去拉去新的用户信息，若做了单点登录则可以存储用户全部信息。  
**权限篇**  
思路：  
* 前端有一份路由表，表示每个路由的可访问权限  
* 用户登录后通过token获取用户role，根据用户role算出对应权限路由，再通过router.addRoutes动态挂载  
* 前端控制页面权限，不同权限用户显示不同的侧边栏和页面按钮等，后端则会验证每一个涉及请求的操作，验证其权限。前端发出的请求中header需要携带用户token，后端根据token来进行验证。  

注意addRoutes的使用  
通过meta标签来标示改页面能访问的权限有哪些  

两步验证，可以加一个微信或qq验证：  
```js  
this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {  
  //this.$router.push({ path: '/' });  
  //不重定向到首页  
  this.showDialog = true //弹出选择第三方平台的dialog  
}).catch(err => {  
  this.$message.error(err); //登录失败提示错误  
});  

```  

**实战篇**  
覆盖elementUI样式：  
* 由于ElementUI是全局引入的，所以要想覆盖它的样式就不能加scoped  
* 这时候可以给某个view的父级加一个class，这样就独一无二了，不会影响其他页面  
* 可以单独拉一个scss文件定义elementui各种样式  

相同component不同作用：  
如创建和编辑ui几乎一样，所以可以公用一个组件，如何判断，但url不变vue是不会执行create和mounted方法的，如何解决？  
* 路由path，若path出现edit就判断为编辑模式  
* 通过meta来区分（更为推荐）  
```js  
// 路由中这样设置  
routes: [  
   {  
      path: 'form/edit',  
      component: Form,  
      name: '编辑form',  
      meta: { isEdit: true }  
   },  
   {  
      path: 'form/create',  
      component: Form,  
      name: '创建form',  
   }  
]  

// 组件中设置  
computed: {  
  isEdit() {  
    return this.$route.meta.isEdit // 根据meta判断  
    // return this.$route.path.indexOf('edit') !== -1 // 根据路由判断  
  }  
}，  
created() {  
  if (this.isEdit) {  
    this.fetchData();  
  }  
},  
```  


### 组件和状态设计
* 数据驱动视图
* 状态：数据结构设计（React-state，Vue-data）
* 视图：组件结构和拆分