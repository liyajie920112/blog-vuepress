<template>
  <div class="theme-container lyj-theme-container">
    <BaseLayout />
    <main class="content" :class="{ 'is-list': isList }">
      <PageList />
    </main>
  </div>
</template>

<script>
import PageList from '@theme/components/PageList'
import Sidebar from '@theme/components/Sidebar'
import { resolveSidebarItems } from '../util'
export default {
  components: {
    PageList,
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
