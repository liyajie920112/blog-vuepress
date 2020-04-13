module.exports = {
  title: 'LiYajie',
  description: 'LiYajie技术小栈',
  themeConfig: {
    logo: '/logo.jpg',
    sidebar: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      { text: 'Github', link: 'https://github.com/liyajie920112' },
    ]
  }
}
