<template>
  <Page>
    <div class="v-payment">
      <div class="container">
        <PayFail class="v-payment__payment" />
        <Divider class="v-payment__divider scale-right js-anim" v-anim="true" />
        <ProductsForYou class="v-payment__products-for-you" />
        <NavPanel class="v-payment__nav-panel" navType="payment" />
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