const { resolve } = require('path')
const { getCategorys, injectApi } = require('./utils')
const { handlerOptions } = require('./node/handlerOptions')

module.exports = (options = {}, ctx) => {
  const { pathMap } = options
  injectApi(ctx)
  const { extPages, postsPages } = handlerOptions(options, ctx)
  return {
    name: 'blog-category',
    enhanceAppFiles:[
      resolve(__dirname, 'enhanceAppFiles.js')
    ],
    async ready() {
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
      postsPages.forEach(item => {
        const { filter, data = {}, frontmatter = {} } = item
        const { frontmatter: rawFrontmatter } = pageCtx
        if (filter(pageCtx, pathMap)) {
          Object.keys(frontmatter).forEach(key => {
            if (!rawFrontmatter[key]) {
              rawFrontmatter[key] = frontmatter[key]
            }
          })
          // 如果需要修改path前缀, 则需要配置pathMap
          if (pathMap && pathMap[data.prePath]) {
            const reg = new RegExp(`^${data.prePath}`)
            pageCtx.path = pageCtx.path.replace(reg, pathMap[data.prePath])
          }
          Object.assign(pageCtx, data)
        }
      })
    }
  }
}
