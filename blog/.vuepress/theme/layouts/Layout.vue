<template>
  <div class="theme-container">
    <Navbar />
    <Page />
  </div>
</template>

<script>
import Page from '@theme/components/Page.vue'
import Navbar from '@theme/components/Navbar.vue'
export default {
  components: {
    Page,
    Navbar
  }
}
</script>
