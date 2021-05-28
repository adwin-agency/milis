<template>
  <div class="payment page-top">
    <div class="row">
      <div class="col col-12 col-lg-6 payment__image-col">
        <div class="payment__image anim-img js-anim" v-anim="true">
          <img src="@/assets/img/payment.jpg" alt="" />
        </div>
      </div>
      <div class="col col-12 col-lg-6 col-xl-5">
        <Header class="page-header fade-slide-down js-anim" v-anim="true" />
        <form class="pay__form pay-result__form">
          <div class="pay__leaf">
            <Icon name="leaf" />
          </div>
          <div class="pay-result__top">
            <div class="pay-result__icon">
              <Icon name="pay-fail" />
            </div>

            <p class="pay__decore">Все просто!</p>
          </div>
          <div class="pay-result__content">
            <div class="pay-result__left">
              <h1 class="pay-result__header">
                Упс. <br />
                Оплата не прошла!
              </h1>
              <p class="pay-result__text">
                Попробуйте еще раз, или свяжитесь с нами
              </p>
              <RouterLink :to="{ name: 'catalog' }" class="pay-result__link"
                >Вернуться в каталог</RouterLink
              >
            </div>
            <div class="pay-result__img">
              <img src="@/assets/img/fail-pay.svg" alt="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./base/Icon";
import Header from "./Header";

export default {
  name: "PayFail",
  components: {
    Icon,
    Header,
  },
};
</script>

<style lang="scss">
</style>