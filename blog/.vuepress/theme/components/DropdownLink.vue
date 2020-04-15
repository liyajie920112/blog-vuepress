<template>
  <div class="dropdown">
    <div class="dropdown-item" v-for="item in nav" :key="item.text">
      <NavLink v-if="item.link" :link="item.link">{{ item.text }}</NavLink>
      <div v-else class="dropdown-wrapper">
        <div class="dropdown-title">{{ item.text }}</div>
        <ul v-if="item.items" class="menu-children">
          <li v-for="child in item.items" :key="child.text">
            <NavLink :link="child.link">{{ child.text }}</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  computed: {
    nav() {
      return this.$themeConfig.nav
    }
  }
}
</script>

<style lang="stylus">
.dropdown
  .dropdown-item
    display inline-block
    &:not(:first-child)
      margin-left 1.5rem
    .dropdown-wrapper
      position relative
      .dropdown-title
        color $accentColor
        cursor pointer
        font-weight 500
      &:hover
        .menu-children
          display block
  .menu-children
    position absolute
    top 100%
    left 0
    display none
    border 1px solid $borderColor
    background-color #fff
    padding 0.5rem 0
    li
      padding 0.2rem 1rem
      &:hover
        background-color #f8f8f8
  ul
    margin 0
    padding 0
    list-style none
</style>