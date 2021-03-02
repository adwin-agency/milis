<template>
  <Page
    v-if="details"
    :productDetails="details.info"
  >
    <div class="v-product">
      <div class="container">
        <Details
          class="v-product__details"
          :details="details.info"
        />
        <Divider class="v-product__divider-1 scale-right js-anim" v-anim="true" />
        <ProductParts class="v-product__product-parts" />
        <Service class="v-product__service" />
        <!-- <Features class="v-product__features" /> -->
        <ReviewsIn
          class="v-product__reviews-in"
          :reviews="details.reviews"
        />
        <Call
          class="v-product__call"
          :details="details.info"
        />
        <SimilarProducts
          class="v-product__similar-products"
          :kitchenStyle="details.info.style"
          :similars="details.similars"
        />
        <Divider class="v-product__divider-2 scale-right js-anim" v-anim="true" v-if="$windowWidth >= $breakpoints.md" />
        <NavPanel
          class="v-product__nav-panel"
          navType="product"
        />
      </div>
    </div>
  </Page>  
</template>

<script>
import Divider from '@/components/base/Divider'
import Page from '@/components/Page'
import Details from '@/components/Details'
import ProductParts from '@/components/ProductParts'
import Service from '@/components/Service'
// import Features from '@/components/Features'
import ReviewsIn from '@/components/ReviewsIn'
import Call from '@/components/Call'
import SimilarProducts from '@/components/SimilarProducts'
import NavPanel from '@/components/NavPanel'
import store from '@/store'

export default {
  name: 'ProductView',
  components: {
    Divider,
    Page,
    Details,
    ProductParts,
    Service,
    // Features,
    ReviewsIn,
    Call,
    SimilarProducts,
    NavPanel
  },
  computed: {
    details() {
      return this.$store.state.kitchenDetails
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('loadKitchenDetails', to.params.kitchen)
      .then(() => next())
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch('loadKitchenDetails', to.params.kitchen)
      .then(() => next())
  },
}
</script>

<style lang="scss">
.v-product {
  &__details {
    margin-bottom: 28px;
  }

  &__divider-1 {
    margin-bottom: 30px;
  }

  &__product-parts {
    margin-bottom: 48px;
  }

  &__service {
    margin-bottom: 45px;
  }

  &__features {
    margin-bottom: 60px;
  }

  &__reviews-in {
    margin-bottom: 60px;
  }

  &__call {
    margin-bottom: 60px;
  }

  &__similar-products {
    margin-bottom: 80px;
  }

  &__nav-panel {
    margin-bottom: 50px;
  }
  
  @include media(md) {
    &__details {
      margin-bottom: 40px;
    }

    &__divider-1 {
      margin-bottom: 40px;
    }

    &__product-parts {
      margin-bottom: 60px;
    }

    &__service {
      margin-bottom: 100px;
    }

    &__features {
      margin-bottom: 100px;
    }

    &__call {
      margin-bottom: 52px;
    }

    &__similar-products {
      margin-bottom: 54px;
    }

    &__divider-2 {
      margin-bottom: 60px;
    }
  }

  @include media(lg) {
    &__product-parts {
      margin-bottom: 65px;
    }

    &__features {
      margin-bottom: 126px;
    }

    &__reviews-in {
      margin-bottom: 100px;
    }

    &__call {
      margin-bottom: 70px;
    }

    &__similar-products {
      margin-bottom: 70px;
    }

    &__divider-2 {
      margin-bottom: 40px;
    }

    &__nav-panel {
      margin-bottom: 60px;
    }
  }

  @include media(xl) {
    &__details {
      margin-bottom: 70px;
    }

    &__divider-1 {
      margin-bottom: 90px;
    }

    &__service {
      margin-bottom: 195px;
    }

    &__reviews-in {
      margin-bottom: 200px;
    }

    &__call {
      margin-bottom: 98px;
    }

    &__nav-panel {
      margin-bottom: 90px;
    }
  }
}
</style>
