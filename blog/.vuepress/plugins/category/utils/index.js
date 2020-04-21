const fs = require('fs')
/**
 * 获取分类, 目录下的一级目录为一级分类
 */
exports.getCategorys = (options, ctx) => {
  const { sourceDir, pages } = ctx
  const { dirs } = options
  const categorys = []
  dirs.forEach(item => {
    const categoryPath = `${sourceDir}/${item.dirname || 'posts'}`
    const _dirs = fs.readdirSync(categoryPath)
    const categoryObj = {
      type: 'group',
      collapsable: false,
      text: item.categoryText,
      link: `${item.path}/`,
      id: item.id,
      children: []
    }
    _dirs.forEach(dir => {
      const stat = fs.statSync(`${categoryPath}/${dir}`)
      if (stat.isDirectory()) {
        const child = {
          text: dir,
          link: `${item.path}/${dir}/`,
          id: `${item.id}-${dir}`
        }
        const posts = pages.filter(a => a.path.startsWith(child.link))
        child.posts = posts.map(a => ({
          text: a.title,
          link: a.path
        }))
        console.log('child.posts', child.posts)
        categoryObj.children.push(child)
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
