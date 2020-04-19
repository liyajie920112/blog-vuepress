const fs = require('fs')
const { resolve } = require('path')
const { getCategorys, injectApi } = require('./utils')
const { handlerOptions } = require('./node/handlerOptions')

module.exports = (options = {}, ctx) => {
  injectApi(ctx)
  const { extPages, postPages } = handlerOptions(options, ctx)
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
      postPages.forEach(item => {
        const { filter, data = {}, frontmatter = {} } = item
        const { frontmatter: rawFrontmatter } = pageCtx
        if (filter(pageCtx)) {
          Object.keys(frontmatter).forEach(key => {
            if (!rawFrontmatter[key]) {
              rawFrontmatter[key] = frontmatter[key]
            }
          })
          Object.assign(pageCtx, data);
        }
      })
    }
  }
}
