<template>
  <div class="delivery">
    <div class="row">
      <div class="col col-12 col-lg-6">
        <div class="delivery__image anim-img js-anim" v-anim="true">
          <img src="../assets/img/delivery-2.jpg" alt="">
        </div>
      </div>
      <div class="col col-12 col-lg-6 col-xl-5 delivery__content-col">
        <Header class="slide-down js-anim" v-anim="true" />
        <div class="delivery__content fade-bounce-right js-anim" v-anim="true">
          <h1 class="delivery__heading">Доставка в срок</h1>
          <p class="delivery__text">Когда кухня будет готова, мы созвонимся с вами и обговорим удобное время доставки. <br><br>Тщательно проверим и упакуем кухню перед отправкой. <br><br>Осуществляем доставку <b>по Москве, Санкт-Петербургу, Московской и Ленинградской областям</b></p>
        </div>
      </div>
      <div class="col col-12 col-lg-9 col-xl-6">
        <Steps class="delivery__steps fade-bounce-right js-anim" v-anim="true" delivery />
      </div>
      <div class="col col-12 col-lg-3 col-xl-6">
        <p class="delivery__decor fade-slide-down js-anim" v-anim="true">Все просто! Кухня за 3 шага</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import Steps from './Steps'

export default {
  name: 'Delivery',
  components: {
    Header,
    Steps
  }
}
</script>

<style lang="scss">
.delivery {
  &__image {
    margin: 0 (-$container-padding);
  }

  &__content {
    margin-top: 40px;
  }

  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__text {
    margin-top: 23px;
    font-size: 14px;
    line-height: (27/14);

    b {
      color: $color-blue;
    }
  }

  &__steps {
    margin-top: 65px;
  }

  &__decor {
    margin-top: 30px;
    font-family: $font-decorative;
    font-size: 40px;
    line-height: (44/40);
    color: $color-gray-middle;
  }

  @include media(md) {
    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__heading {
      font-size: 44px;
      line-height: (54/44);
    }

    &__text {
      padding-right: 80px;
      font-size: 16px;
      line-height: (27/16);
    }

    &__steps {
      margin-top: 45px;
    }

    &__decor {
      margin-top: 40px;
    }
  }

  @include media(lg) {
    &__content-col {
      order: -1;
    }

    &__content {
      margin-top: 44px;
      margin-bottom: 60px;
    }

    &__text {
      margin-top: 28px;
      font-size: 12px;
      line-height: (21/12);
    }

    &__image {
      margin-left: 0;
      margin-bottom: 72px;
    }

    &__steps {
      margin-top: 0;
    }

    &__decor {
      margin-top: 55px;
      margin-left: 44px;
      max-width: 200px;
    }
  }

  @include media(xl) {
    &__content-col {
      margin-right: auto;
    }

    &__content {
      margin-top: 54px;
    }

    &__heading {
      font-size: 60px;
      line-height: (73/60);
    }

    &__text {
      padding-right: 90px;
      font-size: 16px;
      line-height: (27/16);
    }

    &__image {
      margin-right: -$container-padding-xl;
      margin-bottom: 0;
    }

    &__steps {
      margin-top: 5px;
      margin-right: 65px;
    }

    &__decor {
      margin-top: 64px;
      margin-left: 0;
    }
  }
}
</style>
