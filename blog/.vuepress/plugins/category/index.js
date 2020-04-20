const fs = require('fs')
const { resolve } = require('path')
const { getCategorys, injectApi } = require('./utils')
const { handlerOptions } = require('./node/handlerOptions')

module.exports = (options = {}, ctx) => {
  injectApi(ctx)
  const { extPages, postPages, categoryPages } = handlerOptions(options, ctx)
  return {
    name: 'blog-category',
    enhanceAppFiles:[
      resolve(__dirname, 'enhanceAppFiles.js')
    ],
    async ready() {
      const { pages, sourceDir } = ctx
      const categorys = getCategorys(options, ctx)
      ctx._map = {
        $categorys: categorys
      }

      // 添加页面
      await Promise.all(extPages.map(async page => ctx.addPage(page)))
    },
    async clientDynamicModules() {
      return [{
        name: 'blog-category.js',
        content: `export default ${JSON.stringify(ctx._map, null, 2)}`
      }]
    },
    extendPageData (pageCtx) {
      [...postPages, ...categoryPages].forEach(item => {
        const { filter, data = {}, frontmatter = {} } = item
        const { frontmatter: rawFrontmatter } = pageCtx
        if (filter(pageCtx)) {
          Object.keys(frontmatter).forEach(key => {
            if (!rawFrontmatter[key]) {
              rawFrontmatter[key] = frontmatter[key]
            }
          })
          Object.assign(pageCtx, data)
        }
      })
    },
    async additionalPages () {
      // 注意 VuePress 没有任何内置的请求库，
      // 你需要自己安装它。
      const rp = require('request-promise')
      // const content = await rp('https://raw.githubusercontent.com/vuejs/vuepress/master/CHANGELOG.md')
      // const content = await rp('https://raw.githubusercontent.com/yygmind/blogs/master/vue3-compile.md')
      const issues = await rp({
        uri: 'https://api.github.com/repos/liyajie920112/blog-vuepress/issues',
        qs: {
          access_token: '860063a61bae5312f426f891d5e8a27817617024'
        },
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true
      })
      const pages = []
      issues.forEach((item, index) => {
        pages.push({
          path: `/blog/${index}`,
          content: item.body,
          category: 'blog'
        })
      })
      return pages
    }
  }
}
