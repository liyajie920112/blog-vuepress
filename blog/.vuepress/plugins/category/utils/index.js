const fs = require('fs')
/**
 * 获取分类, 目录下的一级目录为一级分类
 */
exports.getCategorys = (options, ctx) => {
  const { sourceDir } = ctx
  const { dirs, category } = options
  const categorys = []
  dirs.forEach(item => {
    const categoryPath = `${sourceDir}/${item.dirname || 'posts'}`
    const _dirs = fs.readdirSync(categoryPath)
    _dirs.forEach(dir => {
      const stat = fs.statSync(`${categoryPath}/${dir}`)
      if (stat.isDirectory()) {
        categorys.push({
          text: dir,
          link: `/category/${dir}/`
        })
      }
    })
  })

  return categorys.concat(category)
}

exports.injectApi = (ctx) => {
  const { layoutComponentMap } = ctx.themeAPI
  const isExistsLayout = name => layoutComponentMap[name] !== undefined
  ctx.getLayout = (name) => {
    return isExistsLayout(name) ? name : 'Layout'
  }
}