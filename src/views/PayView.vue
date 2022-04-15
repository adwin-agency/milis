<template>
  <Page>
    <div class="v-pay">
      <div class="container">
        <PayPage class="v-pay__payment" />
        <Divider class="v-pay__divider scale-right js-anim" v-anim="true" />
        <ProductsForYou class="v-pay__products-for-you" />
        <NavPanel class="v-pay__nav-panel" navType="payment" />
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from "@/components/base/Divider";
import Page from "@/components/Page";
import PayPage from "@/components/PayPage";

import ProductsForYou from "@/components/ProductsForYou";
import NavPanel from "@/components/NavPanel";

export default {
  name: "PayView",
  components: {
    Divider,
    Page,
    PayPage,
    ProductsForYou,
    NavPanel,
  },
};
</script>

<style lang="scss">
.v-pay {
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
