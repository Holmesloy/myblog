(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{575:function(t,s,a){"use strict";a.r(s);var n=a(4),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"project"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#project"}},[t._v("#")]),t._v(" Project")]),t._v(" "),a("h2",{attrs:{id:"组件和状态设计"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件和状态设计"}},[t._v("#")]),t._v(" 组件和状态设计")]),t._v(" "),a("ul",[a("li",[t._v("数据驱动视图")]),t._v(" "),a("li",[t._v("状态：数据结构设计（React-state，Vue-data）")]),t._v(" "),a("li",[t._v("视图：组件结构和拆分")])]),t._v(" "),a("p",[a("strong",[t._v("实例：React实现todoList")]),a("br"),t._v("\nstate数据结构设计：")]),t._v(" "),a("ul",[a("li",[t._v("用数据描述所有的内容")]),t._v(" "),a("li",[t._v("数据要结构化，易于操作（遍历和查找等）")]),t._v(" "),a("li",[t._v("数据要可扩展，以便增加新的功能")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("  \n   list"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("  \n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("  \n         id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  \n         titile"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'标题1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  \n         completed"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("  \n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n")])])]),a("p",[t._v("组件设计：")]),t._v(" "),a("ul",[a("li",[t._v("从功能上拆分层次")]),t._v(" "),a("li",[t._v("尽量让组件原子化（一个组件承担一个功能）")]),t._v(" "),a("li",[t._v("容器组件（只管理数据）& UI组件（只显示视图）")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("App"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*外层组件，只负责管理数据*/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Input"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*只负责输入，将并将数据结果给父组件*/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("List"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*只负责显示列表*/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("ListItem"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*显示单条数据，删除和切换状态*/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("ListItem"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("  \n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("ListItem"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("  \n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("List"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("  \n")])])]),a("p",[a("strong",[t._v("实例2：Vue实现购物车")]),a("br"),t._v("\ndata数据结构设计：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("  \n   itemList"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("  \n      id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  \n      name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'商品1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  \n      price"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("  \n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  \n   cartList"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("  \n      id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  \n      number"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  \n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n")])])]),a("h2",{attrs:{id:"代码规范化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码规范化"}},[t._v("#")]),t._v(" 代码规范化")]),t._v(" "),a("p",[t._v("辅助工具：\nESLint + Prettier")]),t._v(" "),a("p",[t._v("项目命名：\n全部采用小写方式，以下划线分隔，如my_project_name")]),t._v(" "),a("p",[t._v("目录命名：\n参照项目命名+复数命名法")]),t._v(" "),a("p",[t._v("js文件命名：\n小写字母+下划线")]),t._v(" "),a("p",[t._v("语法：")]),t._v(" "),a("ul",[a("li",[t._v("缩进使用4个空格")]),t._v(" "),a("li",[t._v("属性使用双引号，不用单引号")]),t._v(" "),a("li",[t._v("属性名全小写+中划线分隔")]),t._v(" "),a("li",[t._v("无用的注释全部删掉")]),t._v(" "),a("li",[t._v("css的书写顺序")])]),t._v(" "),a("p",[t._v("项目相关："),a("br"),t._v("\n2048 game"),a("br"),t._v("\n// 设计，js功能逻辑，dom操作，html与css布局，简单动画")]),t._v(" "),a("ul",[a("li",[t._v("WebAPP音乐播放器"),a("br"),t._v("\nFlex布局与Rem适配方案"),a("br"),t._v("\n模板字符串传递数据")])]),t._v(" "),a("p",[t._v("组件、css")]),t._v(" "),a("p",[t._v("eBay："),a("br"),t._v("\nebay的一个云平台，由altus ui sdk扩展plugin插件，每个由四个部分组成，组件、路由、Actions、Store，由react和redux进行实现。"),a("br"),t._v("\n终端用户直接访问http：go/altus。"),a("br"),t._v("\n而该网址背后经过了一系列处理:")]),t._v(" "),a("ul",[a("li",[t._v("Altus UI Core发布到github，然后使用cdn加载静态资源")]),t._v(" "),a("li",[t._v("plugins同上发布")]),t._v(" "),a("li",[t._v("plugins还要注册到插件仓库，所以网址中就可以获得插件列表信息")]),t._v(" "),a("li",[t._v("altus web运用web server将html显示到该网址")]),t._v(" "),a("li",[t._v("因此，该网址的组成：html + get plugin list + altus 核心静态资源")])]),t._v(" "),a("p",[t._v("workloads：插件用来查看运行服务的当前工作负载、状态信息、运行信息、cName信息（CNAME记录就是把域名解析到另外一个域名）"),a("br"),t._v("\nCNAME将几个主机名指向一个别名，其实跟指向IP地址是一样的，因为这个别名也要做一个A记录的。但是使用CNAME记录可以很方便地变更IP地址。如果一台服务器有100个网站，他们都做了别名，该台服务器变更IP时，只需要变更别名的A记录就可以了。"),a("br"),t._v("\n一个 CDN 网络往往有非常多的边际(edge)节点，当你购买了 CDN 服务又想用自己的域名的时候，直接把你的域名 CNAME 到 CDN 的域名就好了，然后当用户连接的时候往往能够连接到他们最近的节点。")])])}),[],!1,null,null,null);s.default=r.exports}}]);