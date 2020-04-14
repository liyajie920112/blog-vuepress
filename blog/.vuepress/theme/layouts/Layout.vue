<template>
  <div class="theme-container lyj-theme-container">
    <Navbar />
    <Sidebar :items="sidebarItems" v-if="!isList" />
    <main class="content" :class="{ 'is-list': isList }">
      <PageList v-if="isList" />
      <Content class="lyj-theme-content" v-else />
    </main>
  </div>
</template>

<script>
import PageList from '@theme/components/PageList'
import Navbar from '@theme/components/Navbar'
import Sidebar from '@theme/components/Sidebar'
import { resolveSidebarItems } from '../util'
export default {
  components: {
    PageList,
    Navbar,
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
    console.log('--', this.sidebarItems)
  }
}
</script>

<style>

</style>
