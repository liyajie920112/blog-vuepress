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
  const postPages = []
  for (const dir of dirs) {
    const { id, path: indexPath, layout: indexLayout, itemLayout = 'Post', dirname } = dir
    const title = id

    if (!indexPath) {
      continue
    }

    extPages.push({
      permalink: indexPath,
      frontmatter: {
        // Set layout for index page.
        layout: ctx.getLayout(indexLayout),
        title
      },
      meta: {
        pid: id,
        id
      }
    })

    postPages.push({
      filter({ regularPath }) {
        const regex = new RegExp(`^/${dirname}/page/\\d+/`);
        return (
          Boolean(regularPath) &&
          regularPath !== indexPath &&
          !regex.test(regularPath) &&
          regularPath.startsWith(`/${dirname}/`)
        );
      },
      frontmatter: {
        layout: ctx.getLayout(itemLayout, 'Post'),
        // permalink: itemPermalink,
      },
      data: {
        pid: id,
        id
      }
    })
  }

  return {
    extPages,
    postPages
  }
}
