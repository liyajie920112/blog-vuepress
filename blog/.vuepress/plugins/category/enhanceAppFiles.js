import BlogCategory from '@dynamic/blog-category'
export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      $categorys() {
        return BlogCategory.$categorys
      },
    }
  })
}
