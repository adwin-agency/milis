<template>
  <Page v-if="reviews">
    <div class="v-reviews">
      <div class="container">
        <Reviews class="v-reviews__reviews" />
        <ReviewsList
          class="v-reviews__reviews-list"
          ref="reviewsList"
          :reviews="reviews"
          :pages="reviewsPages"
          :activePage="activePage"
          @changePage="changePage"
        />
        <Divider class="v-reviews__divider scale-right js-anim" v-anim="true" />
        <ProductsForYou class="v-reviews__products-for-you" />
        <NavPanel
          class="v-reviews__nav-panel"
          navType="reviews"
        />
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from '@/components/base/Divider'
import Page from '@/components/Page'
import Reviews from '@/components/Reviews'
import ReviewsList from '@/components/ReviewsList'
import ProductsForYou from '@/components/ProductsForYou'
import NavPanel from '@/components/NavPanel'
import store from '@/store'

export default {
  name: 'ReviewsView',
  components: {
    Divider,
    Page,
    Reviews,
    ReviewsList,
    ProductsForYou,
    NavPanel
  },
  data() {
    return {
      activePage: 1
    }
  },
  computed: {
    reviews() {
      return this.$store.state.reviews
    },
    reviewsPages() {
      return this.$store.state.reviewsPages
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('loadReviews')
      .then(next())
  },
  methods: {
    changePage(num) {      
      store.dispatch('loadReviews', num)
        .then(() => this.activePage = num)
    }
  }
}
</script>

<style lang="scss">
.v-reviews {
  &__reviews {
    margin-bottom: 40px;
  }

  &__reviews-list {
    margin-bottom: 45px;
  }

  &__divider {
    margin-bottom: 55px;
  }

  &__products-for-you {
    margin-bottom: 60px;
  }

  &__nav-panel {
    margin-bottom: 60px;
  }

  @include media(md) {
    &__reviews-list {
      margin-bottom: 80px;
    }

    &__divider {
      margin-bottom: 65px;
    }

    &__products-for-you {
      margin-bottom: 40px;
    }
  }

  @include media(lg) {
    &__reviews {
      margin-bottom: 45px;
    }

    &__divider {
      margin-bottom: 90px;
    }

    &__products-for-you {
      margin-bottom: 50px;
    }
  }

  @include media(xl) {
    &__reviews {
      margin-bottom: 55px;
    }

    &__reviews-list {
      margin-bottom: 50px;
    }

    &__divider {
      margin-bottom: 50px;
    }

    &__products-for-you {
      margin-bottom: 60px;
    }

    &__nav-panel {
      margin-bottom: 70px;
    }
  }
}
</style>