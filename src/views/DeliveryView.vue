<template>
  <Page>
    <div class="v-delivery">
      <div class="container">
        <Delivery class="v-delivery__delivery" />
        <Assembly class="v-delivery__assembly" />
        <Divider class="v-delivery__divider scale-right js-anim" v-anim="true" />
        <ProductsForYou class="v-delivery__products-for-you" />
        <NavPanel
          class="v-delivery__nav-panel"
          navType="delivery"
        />
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from '@/components/base/Divider'
import Page from '@/components/Page'
import Delivery from '@/components/Delivery'
import Assembly from '@/components/Assembly'
import ProductsForYou from '@/components/ProductsForYou'
import NavPanel from '@/components/NavPanel'

export default {
  name: 'DeliveryView',
  components: {
    Divider,
    Page,
    Delivery,
    Assembly,
    ProductsForYou,
    NavPanel
  }
}
</script>

<style lang="scss">
.v-delivery {
  &__delivery {
    margin-bottom: 40px;
  }

  &__assembly {
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
    &__assembly {
      margin-bottom: 80px;
    }
  }

  @include media(lg) {
    &__delivery {
      margin-bottom: 80px;
    }

    &__assembly {
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
    &__delivery {
      margin-bottom: 170px;
    }

    &__assembly {
      margin-bottom: 50px;
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
