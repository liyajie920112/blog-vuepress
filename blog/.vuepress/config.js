const { formatDate } = require('./utils')
module.exports = {
  title: 'LiYajie',
  description: 'LiYajie技术小栈',
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
    ['@vuepress/nprogress'],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          // const moment = require('moment')
          // moment.locale(lang)
          // return moment(timestamp).fromNow()
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
