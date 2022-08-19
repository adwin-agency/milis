<template>
  <Page>
    <div class="v-main">
      <div class="container">
        <MainBanner class="v-main__banner" />
      </div>
    </div>
  </Page>
</template>

<script>
import MainBanner from '../components/MainBanner.vue'
import Page from '../components/Page.vue'

export default {
  name: 'MainView',
  components: {
    Page,
    MainBanner
  }
}
</script>

<style lang="scss">
.v-main {
  &__banner {
    margin-bottom: 50px;
  }
}
</style>
