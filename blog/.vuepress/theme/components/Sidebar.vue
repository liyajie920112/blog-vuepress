<template>
  <div class="sidebar">
    <ul class="sidebar-group" v-for="item in categorys" :key="item.link">
      <li class="group-title">
        <a :href="item.link" class="sidebar-link">{{ item.text }}</a>
      </li>
      <ul class="sub-sidebar-group">
        <li class="sidebar-item" v-for="child in item.posts" :key="child.link">
          <RouterLink class="sidebar-link" :to="child.link">{{ child.text }}</RouterLink>
        </li>
      </ul>
    </ul>
    <ul class="sidebar-group" v-for="item in items" :key="item.title">
      <li class="group-title">
        <RouterLink class="sidebar-link" :to="item.path || ''">{{ item.title }}</RouterLink>
      </li>
      <ul class="sub-sidebar-group" v-if="item.children && item.children.length">
        <li class="sidebar-item" v-for="child in item.children" :key="child.title">
          <RouterLink class="sidebar-link" :to="child.path">{{ child.title }}</RouterLink>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    categorys: Array
  },
  mounted() {
    console.log('--', this.items)
  }
}
</script>

<style>
</style>