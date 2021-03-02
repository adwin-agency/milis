<template>
  <Page>
    <div class="v-payment">
      <div class="container">
        <Payment class="v-payment__payment" />
        <Credit class="v-payment__credit" />
        <Divider class="v-payment__divider scale-right js-anim" v-anim="true" />
        <ProductsForYou class="v-payment__products-for-you" />
        <NavPanel class="v-payment__nav-panel" payment />
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from '@/components/base/Divider'
import Page from '@/components/Page'
import Payment from '@/components/Payment'
import Credit from '@/components/Credit'
import ProductsForYou from '@/components/ProductsForYou'
import NavPanel from '@/components/NavPanel'

export default {
  name: 'PaymentView',
  components: {
    Divider,
    Page,
    Payment,
    Credit,
    ProductsForYou,
    NavPanel
  }
}
</script>

<style lang="scss">
.v-payment {
  &__payment {
    margin-bottom: 40px;
  }

  &__credit {
    margin-bottom: 60px;
  }

  &__divider {
    margin-bottom: 60px;
  }

  &__products-for-you {
    margin-bottom: 60px;
  }

  &__nav-panel {
    margin-bottom: 60px;
  }

  @include media(md) {
    &__credit {
      margin-bottom: 80px;
    }

    &__products-for-you {
      margin-bottom: 40px;
    }
  }

  @include media(lg) {
    &__payment {
      margin-bottom: 60px;
    }

    &__credit {
      margin-bottom: 90px;
    }

    &__divider {
      margin-bottom: 90px;
    }

    &__products-for-you {
      margin-bottom: 50px;
    }
  }

  @include media(xl) {
    &__payment {
      margin-bottom: 150px;
    }

    &__products-for-you {
      margin-bottom: 60px;
    }

    &__nav-panel {
      margin-bottom: 90px;
    }
  }
}
</style>
