<template>
  <article class="page-list lyj-page-list">
    <div class="post" v-for="item in blogs" :key="item.key">
      <NavLink :link="item.path"><h1>{{ item.title }}</h1></NavLink>
      <p v-if="item.frontmatter.summary">{{ item.frontmatter.summary }}</p>
      <div class="tip">
        <span class="last-update-time">{{ item.lastUpdated }}</span>
        <span class="blog-tags">{{ item.frontmatter.tags || 'JS' }}</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10
    }
  },
  computed: {
    blogs() {
      const startIndex = (this.pageIndex - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.validBlogs.slice(startIndex, endIndex)
    },
    validBlogs() {
      return this.$site.pages.filter(a => a.frontmatter.publish === 1)
    }
  }
}
</script>

<style>

</style>