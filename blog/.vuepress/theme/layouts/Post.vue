<template>
  <div class="theme-container lyj-theme-container">
    <BaseLayout />
    <Sidebar :items="sidebarItems" />
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
  },
  mounted() {
    console.log('this.$site', this)
    console.log('--', this.$categorys)
  }
}
</script>
