<template>
  <Page>
    <div class="v-main">
      <div class="container">
        <Header
          class="v-main__header slide-down js-anim"
          v-anim="true"
        />
        <MainBanner
          class="v-main__banner fade-bounce-right js-anim"
          v-anim="true"
        />
        <MainProducts
          class="v-main__products"
          :products="products"
        />
        <MainForm class="v-main__form" />
        <MainReviews class="v-main__reviews" />
        <MainPreview class="v-main__preview" />
      </div>
    </div>
  </Page>
</template>

<script>
import Header from '../components/Header.vue'
import MainBanner from '../components/MainBanner.vue'
import MainForm from '../components/MainForm.vue'
import MainPreview from '../components/MainPreview.vue'
import MainProducts from '../components/MainProducts.vue'
import MainReviews from '../components/MainReviews.vue'
import Page from '../components/Page.vue'

export default {
  name: 'MainView',
  components: {
    Page,
    MainBanner,
    Header,
    MainForm,
    MainReviews,
    MainPreview,
    MainProducts
  },
  computed: {
    products() {
      return this.$store.state.topKitchens
    }
  },
  created() {
    this.$store.dispatch('loadTopKitchens')
  }
}
</script>

<style lang="scss">
.v-main {
  padding-top: 20px;

  &__banner {
    margin-bottom: 44px;
  }

  &__form {
    margin-bottom: 56px;
  }

  &__reviews {
    margin-bottom: 32px;
  }

  &__preview {
    margin-bottom: 30px;
  }

  @include media(lg) {
    &__banner {
      margin-bottom: 70px;
    }

    &__form {
      margin-bottom: 64px;
    }

    &__reviews {
      margin-bottom: 78px;
    }

    &__preview {
      margin-bottom: 88px;
    }
  }

  @include media(xl) {
    padding-top: 30px;

    &__banner {
      margin-bottom: 90px;
    }

    &__form {
      margin-bottom: 75px;
    }

    &__reviews {
      margin-bottom: 90px;
    }
  }
}
</style>
