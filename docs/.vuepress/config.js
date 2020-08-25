module.exports = {
    title: '进阶',
    description: '学习笔记',
    base: '/myBlog/',
    head: [
      ['link', { rel: 'icon', href: `/cc.png` }],
    ],
    themeConfig: {
      logo: "/cc.png",
      nav: [
        { text: '主页', link: '/' },
        { text: '前端知识', link: '/frontend/' },
        { text: '算法', link: '/algorithm/' },
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
      sidebar: {
        "/frontend/":[
          ["", "Hello"]
        ],
        "/algorithm/":[
          ["", "算法"],
          ["offer","剑指offer题解"],
          ["leetcode", "leetcode题解"]
        ],
        "/notes/": [
          ["", "笔记"]
        ],
      }
    }
  }