<template>
  <div class="sidebar">
    <ul class="sidebar-group" v-for="item in categorys2" :key="item.link">
      <li class="group-title" @click.prevent="show(item)">
        <span class="sidebar-link">{{ item.text }} <i v-if="item.posts && item.posts.length" class="collaps-arrow" :class="{ down: item.link === curPath }"></i></span>
      </li>
      <ul class="sub-sidebar-group" v-show="item.collapsable && item.link === curPath">
        <li class="sidebar-item" v-for="child in item.posts" :key="child.link">
          <RouterLink @click.native="showHeaders(child)" class="sidebar-link" :exact="exact" :to="child.link">{{ child.text }}</RouterLink>
          <ul class="sidebar-sub-headers" v-show="child.link === curChildPath" v-if="child.headers && child.headers.length">
            <li class="sidebar-item" v-for="header in child.headers" :key="header.title">
              <RouterLink class="sidebar-link" :exact="exact" :to="header.path">{{ header.title }}</RouterLink>
            </li>
          </ul>
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
  data() {
    return {
      curPath: '',
      curChildPath: '',
      categorys2: this.categorys
    }
  },
  computed: {
    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
      }
      return this.link === '/'
    }
  },
  methods: {
    show(item) {
      if (item.link === this.curPath) {
        this.curPath = ''
      } else {
        this.curPath = item.link
      }
    },
    showHeaders(item) {
      if (item.link === this.curChildPath) {
        this.curChildPath = ''
      } else {
        this.curChildPath = item.link
      }
    }
  }
}
</script>

<style>
</style>