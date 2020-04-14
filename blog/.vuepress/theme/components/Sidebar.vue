<template>
  <div class="sidebar">
    <ul class="sidebar-group" v-for="item in items" :key="item.title">
      <li class="group-title">
        <a :href="item.path" class="sidebar-link">{{ item.title }}</a>
      </li>
      <ul class="sub-sidebar-group">
        <li class="sidebar-item" v-for="child in item.children" :key="child.title">
          <a class="sidebar-link" :href="child.path">{{ child.title }}</a>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  }
}
</script>

<style>

</style>