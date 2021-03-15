<template>
  <div class="v-page">
    <slot></slot>
    <Footer :productDetails="productDetails" />
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'Page',
  components: {
    Footer
  },
  props: {
    productDetails: Object
  }
}
</script>
