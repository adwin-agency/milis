<template>
  <Page>
    <div class="v-main">
      <div class="container">
        <Header class="v-main__header" />
        <MainBanner class="v-main__banner" />
        <MainForm class="v-main__form" />
      </div>
    </div>
  </Page>
</template>

<script>
import Header from '../components/Header.vue'
import MainBanner from '../components/MainBanner.vue'
import MainForm from '../components/MainForm.vue'
import Page from '../components/Page.vue'

export default {
  name: 'MainView',
  components: {
    Page,
    MainBanner,
    Header,
    MainForm
  }
}
</script>

<style lang="scss">
.v-main {
  padding-top: 20px;

  &__banner {
    margin-bottom: 50px;
  }

  &__form {
    margin-bottom: 50px;
  }

  @include media(xl) {
    padding-top: 30px;
  }
}
</style>
