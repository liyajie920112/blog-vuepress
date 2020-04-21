<template>
  <div class="theme-container lyj-theme-container">
    <BaseLayout />
    <Sidebar :items="sidebarItems" :categorys="categorys" />
    <main class="content">
      <Content class="lyj-theme-content" />
    </main>
  </div>
</template>

<script>
import Sidebar from '@theme/components/Sidebar'
import { resolveSidebarItems } from '../util'
export default {
  components: {
    Sidebar
  },
  computed: {
    isList() {
      return this.$page.path === '/'
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    categorys() {
      const c = this.$categorys.find(a => a.id === this.$frontmatter.pid)
      return c ? c.children : []
    }
  },
  mounted() {
    console.log('this.$site', this)
    console.log('--', this.$categorys)
    const category = this.$categorys.find(a => a.type === this.$frontmatter.type)
    console.log('category', category)
  }
}
</script>
