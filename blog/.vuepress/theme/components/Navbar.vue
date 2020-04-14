<template>
  <div class="lyj-navbar navbar">
    <NavLink class="title" link="/">{{ $site.title }}</NavLink>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.lyj-navbar
  padding: .7rem 1.5rem;
  line-height: 2.2rem;
  .title
    font-size 1.3rem
</style>