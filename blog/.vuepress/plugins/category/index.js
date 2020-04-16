const fs = require('fs')
const { resolve } = require('path')

module.exports = (options = {}, ctx) => {
  return {
    name: 'blog-category',
    enhanceAppFiles:[
      resolve(__dirname, 'enhanceAppFiles.js')
    ],
    async ready() {
      const { pages, sourceDir } = ctx
      const categorys = []
      // 读取文件夹
      const postsPath = sourceDir + '/posts'
      const c = require(postsPath + '/config.js')
      console.log('c', c)
      ctx._map = {
        $categorys: c.nav.map(a => ({ ...a, link: '/posts' + a.link }))
      }
    },
    async clientDynamicModules() {
      return [{
        name: 'blog-category.js',
        content: `export default ${JSON.stringify(ctx._map, null, 2)}`
      }]
    },
    extendPageData ($page) {
      // const { path } = $page
      // if (path.includes('_')) {
      //   const paths = $page.path.split('_')
      //   const lastIndex = paths[0].lastIndexOf('/')
      //   $page.path = paths[0].slice(0, lastIndex) + '/' + paths[1]
      // }
      // const { transformer, dateOptions } = options
    }
  }
}
