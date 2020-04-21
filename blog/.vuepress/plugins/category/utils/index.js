const fs = require('fs')
/**
 * 获取分类, 目录下的一级目录为一级分类
 */
exports.getCategorys = (options, ctx) => {
  const { sourceDir, pages, themeConfig } = ctx
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
          id: `${item.id}-${dir}`,
          collapsable: true,
          isShow: false
        }
        const posts = pages.filter(a => a.path.startsWith(child.link))
        child.posts = posts.map(a => ({
          text: a.title,
          link: a.path,
          headers: this.resolveSidebarItems(
            a,
            a.regularPath,
            { pages, themeConfig },
            '/'
          )
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

const hashRE = /#.*$/
const extRE = /\.(md|html)$/
const endingSlashRE = /\/$/
const outboundRE = /^[a-z]+:/i

exports.normalize = (path) => {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

exports.getHash = (path) => {
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

exports.isExternal = (path) => {
  return outboundRE.test(path)
}

exports.isMailto = (path) => {
  return /^mailto:/.test(path)
}

exports.isTel = (path) => {
  return /^tel:/.test(path)
}

exports.ensureExt = (path) => {
  if (isExternal(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

exports.isActive = (route, path) => {
  const routeHash = decodeURIComponent(route.hash)
  const linkHash = getHash(path)
  if (linkHash && routeHash !== linkHash) {
    return false
  }
  const routePath = normalize(route.path)
  const pagePath = normalize(path)
  return routePath === pagePath
}

const resolvePage = (pages, rawPath, base) => {
  if (isExternal(rawPath)) {
    return {
      type: 'external',
      path: rawPath
    }
  }
  if (base) {
    rawPath = resolvePath(rawPath, base)
  }
  const path = normalize(rawPath)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].regularPath) === path) {
      return Object.assign({}, pages[i], {
        type: 'page',
        path: ensureExt(pages[i].path)
      })
    }
  }
  console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`)
  return {}
}

function resolvePath (relative, base, append) {
  const firstChar = relative.charAt(0)
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '..') {
      stack.pop()
    } else if (segment !== '.') {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
exports.resolveSidebarItems = (page, regularPath, site, localePath) => {
  const { pages, themeConfig } = site

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig

  const pageSidebarConfig = page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar
  if (pageSidebarConfig === 'auto') {
    return resolveHeadersNoTitle(page)
  }

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar
  if (!sidebarConfig) {
    return []
  } else {
    const { base, config } = resolveMatchingConfig(regularPath, sidebarConfig)
    return config
      ? config.map(item => resolveItem(item, pages, base))
      : []
  }
}

/**
 * @param { Page } page
 * @returns { SidebarGroup }
 */
function resolveHeaders (page) {
  const headers = groupHeaders(page.headers || [])
  return [{
    type: 'group',
    collapsable: false,
    title: page.title,
    path: null,
    children: headers.map(h => ({
      type: 'auto',
      title: h.title,
      basePath: page.path,
      path: page.path + '#' + h.slug,
      children: h.children || []
    }))
  }]
}

/**
 * @param { Page } page
 * @returns { SidebarGroup }
 */
function resolveHeadersNoTitle (page) {
  const headers = groupHeaders(page.headers || [])
  return headers.map(h => ({
    type: 'auto',
    title: h.title,
    basePath: page.path,
    path: page.path + '#' + h.slug,
    children: h.children || []
  }))
}

const groupHeaders = (headers) => {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h))
  let lastH2
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h)
    }
  })
  return headers.filter(h => h.level === 2)
}

exports.resolveNavLinkItem = (linkItem) => {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length ? 'links' : 'link'
  })
}

/**
 * @param { Route } route
 * @param { Array<string|string[]> | Array<SidebarGroup> | [link: string]: SidebarConfig } config
 * @returns { base: string, config: SidebarConfig }
 */
exports.resolveMatchingConfig = (regularPath, config) => {
  if (Array.isArray(config)) {
    return {
      base: '/',
      config: config
    }
  }
  for (const base in config) {
    if (ensureEndingSlash(regularPath).indexOf(encodeURI(base)) === 0) {
      return {
        base,
        config: config[base]
      }
    }
  }
  return {}
}

function ensureEndingSlash (path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveItem (item, pages, base, groupDepth = 1) {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    })
  } else {
    const children = item.children || []
    if (children.length === 0 && item.path) {
      return Object.assign(resolvePage(pages, item.path, base), {
        title: item.title
      })
    }
    return {
      type: 'group',
      path: item.path,
      title: item.title,
      sidebarDepth: item.sidebarDepth,
      children: children.map(child => resolveItem(child, pages, base, groupDepth + 1)),
      collapsable: item.collapsable !== false
    }
  }
}
