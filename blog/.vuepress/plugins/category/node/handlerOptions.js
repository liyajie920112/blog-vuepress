const fs = require('fs')
const { join } = require('path')
exports.handlerOptions = (options, ctx) => {
  // 验证dirs
  let { dirs =[] } = options

  // 验证文件夹是否存在
  dirs = dirs.filter(dir => {
    const targetDir = join(ctx.sourceDir, dir.dirname)
    if (fs.existsSync(targetDir)) {
      return true
    }
    return false
  })

  // extPages
  const extPages = []
  const postsPages = []
  for (const dir of dirs) {
    const { id, path: indexPath, layout: indexLayout, dirname } = dir
    const title = id

    if (!indexPath) {
      continue
    }

    extPages.push({
      permalink: indexPath,
      frontmatter: {
        // Set layout for index page.
        layout: ctx.getLayout(indexLayout),
        title,
        category: dirname
      },
      meta: {
        pid: id,
        id
      }
    })

    postsPages.push({
      filter({ regularPath }) {
        return (
          regularPath !== indexPath &&
          regularPath.startsWith(`/${dirname}/`)
        )
      },
      frontmatter: {
        layout: ctx.getLayout(indexLayout, 'Layout'),
        // permalink: itemPermalink,
        pid: id,
        id
      },
      data: {
        pid: id,
        id,
        prePath: `/${dirname}`
      }
    })
  }

  return {
    extPages,
    postsPages
  }
}
