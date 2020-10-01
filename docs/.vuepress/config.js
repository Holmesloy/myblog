module.exports = {
    title: '进阶',
    description: '学习笔记',
    base: '/myBlog/',
    head: [
      ['link', { rel: 'icon', href: `/cc.png` }],
    ],
    themeConfig: {
      logo: "/cc.png",
      displayAllHeaders: false,
      smoothScroll: true,
      // 主页导航栏配置
      nav: [
        { text: '主页', link: '/' },
        { text: '前端知识', link: '/frontend/' },
        { text: '算法', link: '/algorithm/' },
        { text: '项目', link: '/project/' },
        { text: '笔记', link: '/notes/' },
        // 下拉列表的配置
        {
          text: 'Languages',
          items: [
            { text: 'Chinese', link: '/language/chinese' },
            { text: 'English', link: '/language/English' }
          ]
        }
      ],
      // 侧边栏配置
      sidebar: {
        
        "/frontend/":[
          ["", "前端"],
          ["js", "JS"],
          ["http", "HTTP"],
          ["css", "CSS"],
          ["browser", "浏览器"],
          ["webpack", "Webpack"],
          ["performance", "性能优化"],
          ["security", "Web安全"],
          ["vue", "Vue"],
          ["react", "React"]
        
        ],
        "/algorithm/":[
          ["", "笔记"],
          ["offer","剑指offer题解"],
          ["interview", "常考算法"],
          ["leetcode", "leetcode题解"],
          ["classification", "算法分类"]
        ],
        "/project/":[
          ["", "项目"]

        ],
        "/notes/": [
          ["", "笔记"]
        ],
      }
    }
  }