<template>
  <Page>
    <div class="v-payment">
      <div class="container">
        <PayPage class="v-payment__payment" />
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