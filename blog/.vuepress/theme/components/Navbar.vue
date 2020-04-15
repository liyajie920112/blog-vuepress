<template>
  <div class="lyj-navbar navbar">
    <NavLink class="title" link="/">{{ $site.title }}</NavLink>
    <div class="nav-wrapper">
      <SearchBox />
      <DropdownLink />
    </div>
  </div>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import SearchBox from '@SearchBox'
export default {
  components: {
    DropdownLink,
    SearchBox
  }
}
</script>

<style lang="stylus">
.lyj-navbar
  padding .7rem 1.5rem
  line-height 2.2rem
  display flex
  justify-content space-between
  .title
    font-size 1.3rem
  .nav-wrapper
    display flex
</style>