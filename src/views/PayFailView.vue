<template>
  <Page>
    <div class="v-pay-fail">
      <div class="container">
        <PayFail class="v-pay-fail__payment" />
        <Divider class="v-pay-fail__divider scale-right js-anim" v-anim="true" />
        <ProductsForYou class="v-pay-fail__products-for-you" />
        <NavPanel class="v-pay-fail__nav-panel" navType="payment" />
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from "@/components/base/Divider";
import Page from "@/components/Page";
import PayFail from "@/components/PayFail";

import ProductsForYou from "@/components/ProductsForYou";
import NavPanel from "@/components/NavPanel";

export default {
  name: "PayFailView",
  components: {
    Divider,
    Page,
    ProductsForYou,
    NavPanel,
    PayFail,
  },
};
</script>


<style lang="scss">
.v-pay-fail {
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
