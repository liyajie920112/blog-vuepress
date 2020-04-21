const fs = require('fs')
/**
 * 获取分类, 目录下的一级目录为一级分类
 */
exports.getCategorys = (options, ctx) => {
  const { sourceDir } = ctx
  const { dirs } = options
  const categorys = []
  dirs.forEach(item => {
    const categoryPath = `${sourceDir}/${item.dirname || 'posts'}`
    const _dirs = fs.readdirSync(categoryPath)
    const categoryObj = {
      text: item.categoryText,
      link: `${item.path}/`,
      children: []
    }
    _dirs.forEach(dir => {
      const stat = fs.statSync(`${categoryPath}/${dir}`)
      if (stat.isDirectory()) {
        categoryObj.children.push({
          text: dir,
          link: `${item.path}/${dir}/`
        })
      }
    })
    if (categoryObj.children.length === 0) {
      delete categoryObj.children
    }
    categorys.push(categoryObj)
  })

  return categorys
}

exports.injectApi = (ctx) => {
  const { layoutComponentMap } = ctx.themeAPI
  const isExistsLayout = name => layoutComponentMap[name] !== undefined
  ctx.getLayout = (name) => {
    return isExistsLayout(name) ? name : 'Layout'
  }
}
