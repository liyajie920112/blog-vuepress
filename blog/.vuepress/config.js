const { formatDate } = require('./utils')
const categoryPlugin = require('./plugins/category/index')
module.exports = {
  title: 'LiYajie',
  description: 'LiYajie技术小栈',
  plugins: [
    [categoryPlugin, {
      dirs: [{
        id: 'posts',
        dirname: 'posts',
        path: '/',
        layout: 'List'
      }], // 博客目录
      category: [{
        text: 'TAG',
        link: '/tag/'
      }]
    }],
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
    ['@vuepress/nprogress'],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          return formatDate(timestamp)
        }
      }
    ],
    ['container', {
      type: 'tip',
      defaultTitle: {
        '/': '提示'
      }
    }],
    ['container', {
      type: 'warning',
      defaultTitle: {
        '/': '注意',
      }
    }],
    ['container', {
      type: 'danger',
      defaultTitle: {
        '/': '警告'
      }
    }],
    ['container', {
      type: 'details',
      before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
      after: () => '</details>\n'
    }],
  ],
  themeConfig: {
    logo: '/logo.jpg',
    sidebar: 'auto',
    nav: [
      { text: 'JS', link: '/js/' },
      { text: 'CSS', link: '/css/' },
      { text: '面试', link: '/interview/' },
      { text: 'Github', link: 'https://github.com/liyajie920112' },
    ]
  }
}
