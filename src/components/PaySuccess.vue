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
              <Icon name="pay-succ" />
            </div>

            <p class="pay__decore">Все просто!</p>
          </div>
          <div class="pay-result__content">
            <div class="pay-result__left">
              <h1 class="pay-result__header">
                Спасибо!<br />
                Ваша оплата прошла успешно!
              </h1>
              <p class="pay-result__text">
                Можете продолжить просмотр кухонь в каталоге
              </p>
              <RouterLink :to="{ name: 'catalog' }" class="pay-result__link"
                >Вернуться в каталог</RouterLink
              >
            </div>
            <div class="pay-result__img">
              <img src="@/assets/img/pay-succ-img.svg" alt="" />
            </div>
            <div class="pay-result__counter">
              <hr class="pay-result__dash" />
              <p class="pay-result__timer">
                Вернем Вас в каталог, через
                <span class="pay-result__time"> {{ time }}</span>
              </p>
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
  name: "PaySuccess",
  components: {
    Icon,
    Header,
  },
  data() {
    return {
      time: "",
      timer: 90,
    };
  },
  created() {
    let date = new Date(this.timer * 1000);
    this.time = date.getMinutes() + ":" + date.getSeconds();

    setInterval(() => {
      if (this.timer > 0) {
        this.timer -= 1;
        let date = new Date(this.timer * 1000);
        this.time = date.getMinutes() + ":" + date.getSeconds();
      } else {
        let router = this.$router;
        router.push({ name: "catalog" });
        return false;
      }
    }, 1000);
  },
};
</script>

<style lang="scss">
.pay-result {
  &__content {
    display: grid;
  }
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  &__icon {
    width: 58px;
    height: 58px;
  }
  &__header {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
  }
  &__text {
    font-size: 24px;
    color: #303864;
    line-height: 33px;
    margin-bottom: 30px;
  }
  &__link {
    color: #0cd725;
    font-size: 18px;
    margin-bottom: 50px;
    display: block;
  }
  &__counter {
    grid-row: 2/3;
  }
  &__timer {
    font-size: 16px;
    color: #303864;

    margin-bottom: 30px;
  }
  &__time {
    font-weight: bold;
  }
  &__img {
    max-width: 345px;
  }
  &__dash {
    display: none;
  }
}

@media (min-width: 800px) {
  .pay-result {
    &__content {
      grid-template-columns: auto 345px;
    }
  }
}
@media (min-width: 1020px) {
  .pay-result {
    &__form.pay__form {
      padding: 74px 50px 66px 100px;
    }
    &__left {
      max-width: 500px;
      padding-top: 20px;
    }
    &__top {
      margin-bottom: 25px;
    }
    &__header {
      font-size: 40px;
      line-height: 54px;
      margin-bottom: 69px;
    }
    &__dash {
      height: 1px;
      background-color: #d3d3d3;
      border: none;
      margin-bottom: 15px;
      display: block;
    }
    &__text {
      margin-bottom: 25px;
    }
  }
}
</style>